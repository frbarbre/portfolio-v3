'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
    api: '/ai/api/chat',
  });

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end">
      <div className="mx-auto flex h-full max-h-[calc(100svh-64px)] w-full max-w-md flex-col overflow-auto rounded-lg border bg-background p-6">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>
                  {m.content.length > 0 ? (
                    m.content
                  ) : (
                    <span className="font-light italic">
                      {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="text-background"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
