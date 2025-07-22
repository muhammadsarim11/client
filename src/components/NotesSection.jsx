
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from '../utils/api.js';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaExclamationTriangle } from "react-icons/fa";

// Debounce function outside component
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // All useEffect hooks first
  useEffect(() => {
    const fetchNotes = async () => {
      const controller = new AbortController();
      
      try {
        const res = await axios.get(`${API_BASE_URL}/note`, {
          withCredentials: true,
          signal: controller.signal,
          timeout: 10000
        });
        const notesData = res.data.note || [];
        const validNotes = notesData.filter(note => 
          note && 
          typeof note === 'object' && 
          note._id && 
          note.title !== undefined && 
          note.content !== undefined
        );
        setNotes(validNotes);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching notes:", err);
          setNotes([]);
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    };
    
    fetchNotes();
  }, []);

  // All useMemo hooks after useEffect
  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  // All useCallback hooks after useMemo
  const debouncedSearch = useCallback(
    debounce((term) => setSearchTerm(term), 300),
    []
  );

  // CRUD Functions
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/note`,
        form,
        { withCredentials: true }
      );
      setNotes(prev => [...prev, res.data.data]);
      setForm({ title: "", content: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/note/${editingNote._id}`,
        form,
        { withCredentials: true }
      );
      setNotes(prev => 
        prev.map(note => 
          note._id === editingNote._id ? res.data.data : note
        )
      );
      setForm({ title: "", content: "" });
      setEditingNote(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setForm({ title: note.title, content: note.content });
    setShowModal(true);
  };

  const handleDeleteNote = (noteId) => {
    setShowDeleteConfirm(noteId);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/note/${showDeleteConfirm}`, {
        withCredentials: true,
      });
      setNotes(prev => prev.filter(note => note._id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setForm({ title: "", content: "" });
  };

  if (loading) return <p className="text-center py-8">Loading notes...</p>;

  return (
    <div className="p-4 sm:p-6">
      {/* Header with Search and Plus Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-800">📖 My Notes</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white p-3 sm:p-2 rounded-full hover:bg-green-700 transition-colors shadow-lg"
            title="Add New Note"
          >
            <FaPlus size={16} />
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredNotes.map((note) => {
            return (
              <div key={note._id} className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-md hover:shadow-xl p-4 sm:p-5 rounded-lg relative border border-green-200 transition-all duration-300 hover:border-green-300">
                <h3 className="font-semibold text-green-800 pr-12 sm:pr-16 mb-2 text-sm sm:text-base line-clamp-2">
                  {note.title || 'No title'}
                </h3>
                <p className="text-green-700 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-2">
                  {note.content || 'No content'}
                </p>
                
                <p className="text-xs text-green-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
                  <button
                    onClick={() => handleEditClick(note)}
                    className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-colors"
                    title="Edit Note"
                  >
                    <FaEdit size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                    title="Delete Note"
                  >
                    <FaTrash size={12} className="sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">No notes found</p>
          <p className="text-gray-400 text-sm">Create your first note to get started</p>
        </div>
      )}

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border-t-4 border-green-600">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-green-800">
                📝 {editingNote ? 'Edit Note' : 'Add New Note'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <FaTimes size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={editingNote ? handleUpdateNote : handleCreateNote} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="Note Title *"
                className="w-full p-3 sm:p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                required
              />
              
              <textarea
                name="content"
                value={form.content}
                onChange={handleFormChange}
                placeholder="Note Content *"
                rows="6"
                className="w-full p-3 sm:p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base"
                required
              ></textarea>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-green-600 text-white py-3 sm:py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
                >
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:flex-1 bg-gray-300 text-gray-700 py-3 sm:py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center border-t-4 border-red-500 shadow-2xl">
            <div className="bg-red-100 rounded-full p-4 w-fit mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Delete Note?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to delete this note? This action cannot be undone and all content will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-colors font-medium shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




