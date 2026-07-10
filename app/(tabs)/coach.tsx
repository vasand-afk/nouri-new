import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip } from '../../src/components/shared/Chip';
import { ChatMessage } from '../../src/types';

const QUICK_PROMPTS = [
  "What should I eat for lunch?",
  "How's my gut health?",
  "GLP-1 side effect tips",
  "High protein breakfast ideas",
  "Best prebiotic foods",
];

const MOCK_RESPONSES: Record<string, string> = {
  "What should I eat for lunch?": "Based on your morning meals, you've had a good protein start. For lunch I'd suggest a lentil and spinach salad with grilled salmon — you'll hit your fiber target and add two new plant families to your gut diversity score. 🥗",
  "How's my gut health?": "Your gut score today is 68 — that's Good! You've logged probiotic Greek yogurt and prebiotic lentils. To push into 'Thriving' (70+), try adding a fermented food like kimchi or kefir, and drink 2 more glasses of water. 🌿",
  "GLP-1 side effect tips": "Common GLP-1 side effects like nausea are usually worse right after injection. Tips: eat smaller meals, avoid greasy or spicy food, stay well hydrated, and eat slowly. Your protein goal is higher (120g) to preserve muscle while losing weight. 💊",
  "High protein breakfast ideas": "Great choices for your 120g protein target: Greek yogurt parfait (17g), egg white omelette with veggies (24g), protein smoothie with cottage cheese (30g), or smoked salmon on whole grain toast (22g). All have prebiotic benefits too! 🥚",
  "Best prebiotic foods": "Top prebiotics to add to your diet: garlic, onions, leeks, asparagus, bananas (slightly underripe), oats, lentils, chickpeas, and Jerusalem artichoke. Even small amounts count — adding 1-2 per day moves your gut score significantly. 🌱",
};

function TypingIndicator() {
  return (
    <View className="flex-row items-center gap-1 py-3 px-4 bg-white rounded-2xl rounded-tl-sm self-start max-w-xs mb-3">
      {[0, 1, 2].map(i => (
        <View key={i} className="w-2 h-2 rounded-full bg-gray-300" />
      ))}
    </View>
  );
}

export default function CoachScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm your Nouri AI coach. I can help with nutrition advice, gut health insights, and GLP-1 support. What would you like to know? 👋",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  function send(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = MOCK_RESPONSES[text] ?? "Great question! Based on your nutrition data, I'd recommend focusing on diverse whole foods, staying hydrated, and including at least one prebiotic food per meal. Would you like specific suggestions? 🥦";

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }]);
    }, 1400);
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-cream" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>
        <View className="px-5 pt-4 pb-2 flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-brand-green items-center justify-center">
            <Text style={{ fontSize: 18 }}>✨</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-text-primary">Nouri Coach</Text>
            <Text className="text-text-muted text-xs">Powered by AI</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              className={`max-w-xs mb-3 px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-green self-end rounded-tr-sm'
                  : 'bg-white self-start rounded-tl-sm'
              }`}
              style={msg.role === 'assistant' ? { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 } : {}}
            >
              <Text className={msg.role === 'user' ? 'text-white text-sm' : 'text-text-primary text-sm'}>
                {msg.content}
              </Text>
            </View>
          ))}
          {isTyping && <TypingIndicator />}
        </ScrollView>

        <View className="px-4 pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
            {QUICK_PROMPTS.map(p => (
              <Chip key={p} label={p} onPress={() => send(p)} />
            ))}
          </ScrollView>
          <View className="flex-row gap-2 items-end bg-white rounded-2xl px-4 py-2 border border-gray-100">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask anything about nutrition..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-sm text-text-primary py-2"
              multiline
              maxLength={500}
              onSubmitEditing={() => send(input)}
            />
            <TouchableOpacity
              onPress={() => send(input)}
              disabled={!input.trim()}
              className={`w-9 h-9 rounded-full items-center justify-center ${input.trim() ? 'bg-brand-green' : 'bg-gray-100'}`}
            >
              <Text className={input.trim() ? 'text-white' : 'text-text-muted'} style={{ fontSize: 16 }}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
