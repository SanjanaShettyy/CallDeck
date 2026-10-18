import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  Paperclip,
  Smile
} from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';
import { MOCK_CHANNELS } from '../data/mock';

export const PulseChannel: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const {
    messages,
    sendMessage,
    pinnedTaskState,
    confirmPinnedTask,
    reschedulePinnedTask,
    replyToPinnedTask
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [pinnedCardReplyInput, setPinnedCardReplyInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChannel =
    MOCK_CHANNELS.find((c) => c.slug === channelId || c.id === channelId) ||
    MOCK_CHANNELS[0];

  const channelMessages = messages.filter(
    (m) => m.channelId === currentChannel.id || m.channelId === 'ch-team'
  );

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(currentChannel.id, inputText);
    setInputText('');
  };

  const handlePinnedReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinnedCardReplyInput.trim()) return;
    replyToPinnedTask(pinnedCardReplyInput);
    setPinnedCardReplyInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.25rem)] bg-[#f7f8fa] animate-in fade-in duration-200">
      {/* Channel Header with Back Button */}
      <div className="h-14 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/pulse')}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Back to Pulse"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>#{currentChannel.name}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
              {currentChannel.badge && (
                <Badge variant="purple" size="xs">
                  {currentChannel.badge}
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              {currentChannel.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            12 members online
          </span>
          <Avatar
            initials="RS"
            size="xs"
            bg="bg-purple-800"
            textColor="text-purple-100"
          />
          <Avatar
            initials="MD"
            size="xs"
            bg="bg-emerald-800"
            textColor="text-emerald-100"
          />
        </div>
      </div>

      {/* Main Chat Stream Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Pinned "Needs your input" card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50/50 to-white border-2 border-rose-300/80 shadow-md p-4 sm:p-5 transition-all">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-600 text-white shadow-2xs">
                <AlertCircle className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                Needs your input
              </span>
            </div>

            {pinnedTaskState === 'confirmed' ? (
              <Badge variant="green" size="xs">
                <CheckCircle className="w-3 h-3 text-emerald-600 inline mr-1" />
                Slot Confirmed
              </Badge>
            ) : pinnedTaskState === 'rescheduled' ? (
              <Badge variant="amber" size="xs">
                <Clock className="w-3 h-3 text-amber-600 inline mr-1" />
                Rescheduled
              </Badge>
            ) : (
              <Badge variant="red" size="xs">
                Urgent Action
              </Badge>
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
            Confirm the 4:30pm callback slot for Mukunda (Ortho GRID King, ₹9,490). Customer confirmed availability on WhatsApp.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-rose-200/60">
            <button
              onClick={confirmPinnedTask}
              disabled={pinnedTaskState === 'confirmed'}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-900 disabled:opacity-70 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {pinnedTaskState === 'confirmed' ? '✓ Confirmed' : 'Confirmed'}
            </button>

            <button
              onClick={reschedulePinnedTask}
              disabled={pinnedTaskState === 'rescheduled'}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              {pinnedTaskState === 'rescheduled' ? 'Rescheduled' : 'Reschedule'}
            </button>

            {/* Quick reply box */}
            <form
              onSubmit={handlePinnedReplySubmit}
              className="flex-1 flex items-center gap-2 min-w-[200px]"
            >
              <input
                type="text"
                placeholder="Type custom reply on this slot..."
                value={pinnedCardReplyInput}
                onChange={(e) => setPinnedCardReplyInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
              <button
                type="submit"
                disabled={!pinnedCardReplyInput.trim()}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer"
              >
                Reply
              </button>
            </form>
          </div>
        </div>

        {/* Message Feed */}
        <div className="max-w-2xl mx-auto space-y-3.5 pt-2">
          {channelMessages.map((msg) => {
            if (msg.isMe) {
              // My message on the right in green
              return (
                <div
                  key={msg.id}
                  className="flex flex-col items-end space-y-1 animate-in slide-in-from-right-2 duration-150"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span className="font-semibold text-emerald-800">You</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="max-w-md p-3.5 rounded-2xl rounded-tr-xs bg-[#14352a] text-white text-xs leading-relaxed shadow-sm">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Teammate or AI Bot on the left
            return (
              <div
                key={msg.id}
                className="flex items-start gap-2.5 max-w-md animate-in slide-in-from-left-2 duration-150"
              >
                <Avatar
                  initials={msg.senderAvatar}
                  size="sm"
                  bg={
                    msg.isBot
                      ? 'bg-purple-700'
                      : msg.senderAvatar === 'RS'
                      ? 'bg-indigo-700'
                      : 'bg-teal-700'
                  }
                  textColor="text-white"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="font-bold text-slate-800">
                      {msg.senderName}
                    </span>
                    {msg.isBot && (
                      <span className="px-1 py-0.2 bg-purple-100 text-purple-800 rounded font-bold text-[9px] uppercase">
                        AI
                      </span>
                    )}
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200/90 text-slate-800 text-xs leading-relaxed shadow-2xs">
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Bar at Bottom */}
      <div className="bg-white border-t border-slate-200 p-3 sm:p-4 shrink-0 shadow-xs">
        <form
          onSubmit={handleSend}
          className="max-w-2xl mx-auto flex items-center gap-2"
        >
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              className="p-1.5 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              title="Attach document or audio"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              title="Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            placeholder={`Message #${currentChannel.name}... (Press Enter to send)`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14352a]/20 focus:border-[#14352a] transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 sm:px-4 sm:py-2 rounded-xl bg-[#14352a] hover:bg-[#1b4335] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
