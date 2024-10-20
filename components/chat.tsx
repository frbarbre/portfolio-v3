'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import getToolName from '@/utils/getToolName';
import { useChat } from 'ai/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Maximize2,
  MessageCircle,
  Minimize2,
  Minus,
  Send,
  Sparkle,
  Stars,
  Wrench,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
    api: '/ai/api/chat',
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    setIsFullScreen(false);
    scrollToBottom();
  }, [isMinimized]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullScreen]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMinimized) {
        setIsMinimized(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (!isMinimized) {
      scrollToBottom();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMinimized]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const chatVariants = {
    minimized: {
      width: 56,
      height: 56,
      borderRadius: '50%',
    },
    default: {
      width: 450,
      height: 600,
      borderRadius: 16,
    },
    fullscreen: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
    },
  };

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-50 flex items-end justify-end',
        isFullScreen ? 'p-0 md:p-6' : 'p-6',
      )}
    >
      <motion.div
        initial="default"
        className="pointer-events-auto"
        onMouseOver={() => {
          document.body.style.overflow = 'hidden';
        }}
        onMouseLeave={() => {
          if (!isFullScreen) {
            document.body.style.overflow = 'auto';
          }
        }}
        animate={
          isMinimized ? 'minimized' : isFullScreen ? 'fullscreen' : 'default'
        }
        variants={chatVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.div
              key="minimized"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="h-14 w-14 rounded-full bg-purple-500 shadow-lg hover:bg-purple-600"
                onClick={() => setIsMinimized(false)}
              >
                <MessageCircle className="h-5 w-5 fill-white text-white" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-background shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b py-2 pl-3 pr-2">
                <h2 className="flex items-center gap-2 text-xs font-semibold">
                  <Stars className="h-4 w-4 fill-purple-500 text-purple-500" />{' '}
                  AI
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsMinimized(true)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsFullScreen(!isFullScreen)}
                  >
                    {!isFullScreen ? (
                      <Maximize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Minimize2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((m) => {
                    const hasContent = m.content.length > 0;

                    const toolName = getToolName(
                      m?.toolInvocations?.[0].toolName,
                    );

                    if (hasContent) {
                      return (
                        <motion.div
                          key={m.id}
                          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-3 py-2.5 ${
                              m.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{m.content}</p>
                          </div>
                        </motion.div>
                      );
                    }

                    if (toolName) {
                      return (
                        <motion.div
                          key={m.id}
                          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div>
                            <p className="whitespace-pre-wrap">
                              <span className="flex items-center gap-2 text-sm font-light text-foreground/60">
                                <Wrench className="h-3.5 w-3.5" />
                                {'Calling tool: ' + toolName}
                              </span>
                            </p>
                          </div>
                        </motion.div>
                      );
                    }
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <motion.form
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-end gap-2 border-t p-2">
                  <Textarea
                    value={input}
                    placeholder="Ask me about Frederik Barbre..."
                    onChange={handleInputChange}
                    className="flex-1 resize-none rounded-lg border-none"
                    rows={3}
                  />
                  <div className="flex w-full justify-between">
                    <Button variant={'ghost'} size={'sm'}>
                      <Sparkle className="mr-2 h-3.5 w-3.5 fill-purple-500 text-purple-500" />
                      Topics
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 w-8 p-0"
                      variant={'ghost'}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
