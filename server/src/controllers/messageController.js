import { dataStore } from '../utils/dataStore.js';
import { escapeHtml } from '../middleware/sanitize.js';

export const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // Honeypot spam defense: bots usually fill hidden honeypot fields
    if (honeypot && honeypot.trim() !== '') {
      // Silently return success to mislead spambot
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been received.',
      });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are all required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const newMessage = await dataStore.create('message', {
      name: escapeHtml(name.trim()),
      email: email.trim().toLowerCase(),
      subject: escapeHtml(subject.trim()),
      message: escapeHtml(message.trim()),
      status: 'unread',
      ipAddress: req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
    });
  } catch (error) {
    next(error);
  }
};

export const getMessagesAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let messages = await dataStore.find('message', {}, { createdAt: -1 });

    if (status && status !== 'all') {
      messages = messages.filter((m) => m.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      messages = messages.filter(
        (m) =>
          (m.name && m.name.toLowerCase().includes(q)) ||
          (m.email && m.email.toLowerCase().includes(q)) ||
          (m.subject && m.subject.toLowerCase().includes(q)) ||
          (m.message && m.message.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'unread', 'read', or 'replied'.",
      });
    }

    const message = await dataStore.findById('message', id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    const updated = await dataStore.findByIdAndUpdate('message', id, { status });

    res.json({
      success: true,
      message: `Message status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('message', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
