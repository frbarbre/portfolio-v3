'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ChatDocument } from '@/prismicio-types';
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
import MarkdownMessage from './markdown-message'; // Import the new component
import useMobile from '@/hooks/useMobile';

export default function Chat({ data }: { data: ChatDocument<string> }) {
  const {
    messages,
    input,
    handleInputChange,
    setMessages,
    handleSubmit,
    reload,
  } = useChat({
    maxSteps: 3,
    api: '/ai/api/chat',
  });

  const [isMinimized, setIsMinimized] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isMobile = useMobile();

  const scrollToBottom = (behavior: 'smooth' | 'auto' | 'instant') => {
    const interval = setInterval(() => {
      if (messagesEndRef.current) {
        console.log('Scrolling to bottom...');
        messagesEndRef.current.scrollIntoView({ behavior: behavior });
        clearInterval(interval);
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom('instant');
  }, [isMinimized, isFullScreen, messages]);

  useEffect(() => {
    setIsFullScreen(false);
  }, [isMinimized]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullScreen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMinimized) {
        if (isMobile) return;
        setIsMinimized(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

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
        initial="minimized"
        className="pointer-events-auto"
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
                  {data.data.label}
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {messages.length === 0 && (
                    <div className="flex h-full flex-col pl-4 pt-4">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {data.data.title || ''}
                      </h2>
                      <p className="mt-2 text-balance text-sm text-foreground/60">
                        {data.data.description || ''}
                      </p>

                      <ul className="mt-4 flex flex-col gap-3">
                        {data.data.default_questions.map((question, index) => (
                          <li key={index} className={`w-full cursor-pointer`}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setMessages([
                                  {
                                    id: `default-question-${question.question}`,
                                    role: 'user' as const,
                                    content: question.question || '',
                                  },
                                ]);
                                reload();
                              }}
                              className="w-max max-w-[90%] cursor-pointer rounded-xl bg-muted px-3 py-2.5 hover:bg-muted/80"
                            >
                              {question.question}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                            className={`max-w-[90%] rounded-xl px-3 py-2.5 ${
                              m.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {/* Use MarkdownMessage to render markdown */}
                            <MarkdownMessage content={m.content} />
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
                </motion.div>
              </div>

              <motion.form
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                ref={formRef}
              >
                <div className="flex flex-col items-end gap-2 border-t p-2">
                  <Textarea
                    value={input}
                    placeholder={data.data.input_placeholder || ''}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSubmit(e);
                      }
                    }}
                    className="flex-1 resize-none rounded-lg border-none text-base"
                    rows={3}
                  />
                  <div className="flex w-full justify-between">
                    {/* <Button variant={'ghost'} size={'sm'}>
                      <Sparkle className="mr-2 h-3.5 w-3.5 fill-purple-500 text-purple-500" />
                      Topics
                    </Button> */}
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
