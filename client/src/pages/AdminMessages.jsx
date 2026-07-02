import React, { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaSignOutAlt, FaFolderOpen, FaInbox, FaTag, FaPhoneAlt, FaEnvelope, FaTrash, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useContextStore } from "../store/ContextStore";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("quotes"); // 'quotes' or 'general'
  const [selectedProductFilter, setSelectedProductFilter] = useState("all");

  const { token } = useContextStore();

  const fetchMessages = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleToggleRead = async (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id ? { ...msg, isRead: true } : msg
      )
    );

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/contact/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success(data.message)
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message)
    }
  };

  const handleDelete = async (id) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== id));

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/contact/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      if (search) return;
      fetchMessages(true);
    }, 10000);

    const onFocus = () => fetchMessages(true);
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [search]);

  // Helper to categorize messages
  const getCategorizedMessages = () => {
    const quotes = [];
    const general = [];

    messages.forEach((msg) => {
      // Check if subject indicates a product quote request
      const isQuote = msg.subject.toLowerCase().includes("quote request") || 
                      msg.subject.toLowerCase().includes("request a quote");
      
      // Attempt to parse product name
      let productName = "Other Products";
      if (isQuote) {
        const parts = msg.subject.split(":");
        if (parts.length > 1) {
          productName = parts[1].trim();
        }
      }

      const msgWithCategory = { ...msg, productName, isQuote };

      if (isQuote) {
        quotes.push(msgWithCategory);
      } else {
        general.push(msgWithCategory);
      }
    });

    return { quotes, general };
  };

  const { quotes, general } = getCategorizedMessages();

  // Filter quotes or general by search query
  const getFilteredList = (list) => {
    return list.filter(
      (msg) =>
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.subject.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredQuotes = getFilteredList(quotes);
  const filteredGeneral = getFilteredList(general);

  // Group filtered quotes by product name
  const groupedQuotes = filteredQuotes.reduce((groups, quote) => {
    const prodName = quote.productName;
    if (!groups[prodName]) {
      groups[prodName] = [];
    }
    groups[prodName].push(quote);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pt-24 min-h-screen max-w-7xl mx-auto space-y-8 bg-gray-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <FaEnvelopeOpenText className="text-primary text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage client product quotes and general inquiries</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            className="px-4 py-2.5 w-full md:w-80 rounded-2xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <NavLink
            to="/signout"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition shadow-sm"
          >
            <FaSignOutAlt />
            Logout
          </NavLink>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar / Left Column */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-3">Folders</h2>
            
            <button
              onClick={() => setActiveTab("quotes")}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition ${
                activeTab === "quotes"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <FaFolderOpen /> Product Quotes
              </span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === "quotes" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}>{quotes.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition ${
                activeTab === "general"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <FaInbox /> General Inquiries
              </span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === "general" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}>{general.length}</span>
            </button>
          </div>
        </div>

        {/* Messages List / Right Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {activeTab === "quotes" ? "Product Quote Requests" : "General Inquiries"}
            </h2>
            <span className="text-sm text-gray-500">
              {activeTab === "quotes" ? filteredQuotes.length : filteredGeneral.length} Messages
            </span>
          </div>

          {activeTab === "quotes" ? (
            /* PRODUCT QUOTES VIEW (GROUPED BY PRODUCT) */
            Object.keys(groupedQuotes).length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
                <p className="text-gray-500 font-medium">No quote requests found.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedQuotes).map(([productName, productQuotes]) => (
                  <div key={productName} className="space-y-4">
                    {/* Product Group Header */}
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                      <FaTag className="text-primary text-sm" />
                      <h3 className="text-lg font-bold text-gray-900 capitalize">
                        {productName} 
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {productQuotes.length} {productQuotes.length === 1 ? "request" : "requests"}
                        </span>
                      </h3>
                    </div>

                    {/* Product Requests List */}
                    <div className="space-y-4">
                      {productQuotes.map((msg) => (
                        <div
                          key={msg._id}
                          className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-sm hover:shadow-md ${
                            msg.isRead ? "border-gray-200/60" : "border-primary/30 ring-1 ring-primary/5"
                          }`}
                        >
                          {/* Message Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900 text-base">{msg.name}</h4>
                                {!msg.isRead && (
                                  <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 font-medium mt-1">
                                Subject: <span className="text-gray-700 capitalize">{msg.subject}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1.5 font-medium">
                                <FaCalendarAlt />
                                {new Date(msg.createdAt).toLocaleString()}
                              </span>
                              <button
                                onClick={() => handleDelete(msg._id)}
                                className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 hover:text-red-600 transition cursor-pointer"
                                title="Delete message"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Message Body & Contact Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Column: Contact details */}
                            <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sender Info</h5>
                              <a
                                href={`mailto:${msg.email}`}
                                className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition font-medium"
                              >
                                <FaEnvelope className="text-gray-400" />
                                {msg.email}
                              </a>
                              <p className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <FaPhoneAlt className="text-gray-400" />
                                {msg.phone}
                              </p>
                            </div>

                            {/* Right Column: Full Message */}
                            <div className="md:col-span-2 space-y-3">
                              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message Content</h5>
                              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/80 min-h-[60px]">
                                <p className="text-gray-700 text-xs whitespace-pre-wrap leading-relaxed">
                                  {msg.message || <span className="text-gray-400 italic">No message content provided.</span>}
                                </p>
                              </div>

                              {/* Action buttons */}
                              {!msg.isRead && (
                                <div className="flex justify-end pt-2">
                                  <button
                                    onClick={() => handleToggleRead(msg._id)}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-full bg-green-600 hover:bg-green-700 text-white transition shadow-sm cursor-pointer"
                                  >
                                    <FaCheckCircle />
                                    Mark as Read
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* GENERAL INQUIRIES VIEW */
            filteredGeneral.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
                <p className="text-gray-500 font-medium">No general inquiries found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGeneral.map((msg) => (
                  <div
                    key={msg._id}
                    className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-sm hover:shadow-md ${
                      msg.isRead ? "border-gray-200/60" : "border-primary/30 ring-1 ring-primary/5"
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-lg">{msg.name}</h3>
                          {!msg.isRead && (
                            <span className="bg-primary text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wider">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 font-semibold mt-1">
                          Subject: <span className="text-gray-700 capitalize">{msg.subject}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FaCalendarAlt />
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 hover:text-red-600 transition cursor-pointer"
                          title="Delete message"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Message Body & Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left Column: Contact details */}
                      <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sender Info</h4>
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-primary transition font-medium"
                        >
                          <FaEnvelope className="text-gray-400" />
                          {msg.email}
                        </a>
                        <p className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                          <FaPhoneAlt className="text-gray-400" />
                          {msg.phone}
                        </p>
                      </div>

                      {/* Right Column: Full Message */}
                      <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message Content</h4>
                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/80 min-h-[80px]">
                          <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.message || <span className="text-gray-400 italic">No message content provided.</span>}
                          </p>
                        </div>

                        {/* Action buttons */}
                        {!msg.isRead && (
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={() => handleToggleRead(msg._id)}
                              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-full bg-green-600 hover:bg-green-700 text-white transition shadow-sm cursor-pointer"
                            >
                              <FaCheckCircle />
                              Mark as Read
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
