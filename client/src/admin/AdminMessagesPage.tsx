import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  AlertTriangle,
  Clock,
  User,
  AtSign,
  Send,
  MessageSquare,
} from 'lucide-react';
import { api } from '../services/api';
import { Message } from '../types';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await api.getMessagesAdmin({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchMessages, 200);
    return () => clearTimeout(timer);
  }, [statusFilter, search]);

  const handleUpdateStatus = async (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    try {
      await api.updateMessageStatus(id, newStatus);
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      setFeedback({ type: 'success', message: `Marked message as ${newStatus}.` });
      await fetchMessages();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Status update failed.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteMessage(id);
      setDeleteConfirmId(null);
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
      setFeedback({ type: 'success', message: 'Message deleted successfully.' });
      await fetchMessages();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete message.' });
    }
  };

  const handleOpenDetail = async (msg: Message) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      await handleUpdateStatus(msg._id, 'read');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-theme-primary">
            Contact Messages & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Private communications received through the public contact form.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm ${
            feedback.type === 'success'
              ? 'bg-lime-400/10 border border-lime-400/30 text-lime-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'unread', 'read', 'replied'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all uppercase ${
                statusFilter === st
                  ? 'bg-lime-400 text-black font-semibold'
                  : 'bg-[#151922] text-theme-secondary hover:text-theme-primary border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sender, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151922] border border-slate-800 text-sm text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="py-20 text-center font-mono text-sm text-theme-muted">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-[#151922] border border-subtle rounded-3xl p-12 text-center space-y-3">
          <Mail className="w-10 h-10 text-theme-muted mx-auto" />
          <h3 className="font-heading font-bold text-lg text-theme-primary">No Messages Found</h3>
          <p className="text-xs text-theme-secondary">
            {statusFilter !== 'all' ? `No ${statusFilter} inquiries found.` : 'Your inbox is clear.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#151922] border border-subtle rounded-3xl overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-800/60">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => handleOpenDetail(msg)}
                className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors ${
                  msg.status === 'unread' ? 'bg-slate-900/60' : ''
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-base text-theme-primary truncate">
                      {msg.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                        msg.status === 'unread'
                          ? 'bg-rose-500/20 text-rose-300'
                          : msg.status === 'replied'
                          ? 'bg-lime-400/20 text-lime-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-theme-primary truncate">{msg.subject}</h4>
                  <p className="text-xs text-theme-secondary truncate max-w-2xl">{msg.message}</p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto text-xs font-mono text-theme-muted">
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setDeleteConfirmId(msg._id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#151922] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                      selectedMessage.status === 'unread'
                        ? 'bg-rose-500/20 text-rose-300'
                        : selectedMessage.status === 'replied'
                        ? 'bg-lime-400/20 text-lime-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                  <span className="text-xs font-mono text-theme-muted">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-xl text-theme-primary">
                  {selectedMessage.subject}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info Card */}
            <div className="p-4 rounded-2xl bg-[#12161f] border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-lime-400" />
                <span className="text-theme-muted">Sender:</span>
                <span className="font-semibold text-theme-primary">{selectedMessage.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <AtSign className="w-4 h-4 text-lime-400" />
                <span className="text-theme-muted">Email:</span>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="font-semibold text-lime-400 hover:underline truncate"
                >
                  {selectedMessage.email}
                </a>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-theme-muted">Message Content</span>
              <div className="p-5 rounded-2xl bg-[#12161f] border border-slate-800 text-sm text-theme-primary whitespace-pre-line leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            {/* Status Actions & Reply Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedMessage._id,
                      selectedMessage.status === 'replied' ? 'read' : 'replied'
                    )
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedMessage.status === 'replied'
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-lime-400/20 text-lime-400 hover:bg-lime-400/30'
                  }`}
                >
                  {selectedMessage.status === 'replied' ? 'Mark as Read' : 'Mark as Replied'}
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedMessage._id, 'unread')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Mark Unread
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lime-400 text-black text-xs font-semibold hover:bg-lime-300"
                >
                  <Send className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
                <button
                  onClick={() => setDeleteConfirmId(selectedMessage._id)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151922] border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-theme-primary">Confirm Deletion</h3>
            <p className="text-xs text-theme-secondary">
              Are you sure you want to delete this message permanently?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
