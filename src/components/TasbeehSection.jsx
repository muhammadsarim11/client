import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUndo, FaTrophy, FaStar, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function TasbeehSection() {
  const [tasbeehs, setTasbeehs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTasbeeh, setEditingTasbeeh] = useState(null);
  const [form, setForm] = useState({ name: "", goal: 33 });
  const [showCelebration, setShowCelebration] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(null);

  // Load tasbeehs from localStorage on component mount
  useEffect(() => {
    const loadTasbeehs = () => {
      try {
        const savedTasbeehs = localStorage.getItem('tasbeehs');
        console.log('Loading from localStorage:', savedTasbeehs);
        
        if (savedTasbeehs && savedTasbeehs !== 'undefined' && savedTasbeehs !== 'null') {
          const parsedTasbeehs = JSON.parse(savedTasbeehs);
          if (Array.isArray(parsedTasbeehs)) {
            setTasbeehs(parsedTasbeehs);
            console.log('Loaded tasbeehs:', parsedTasbeehs);
          } else {
            console.log('Invalid data format, resetting to empty array');
            setTasbeehs([]);
          }
        } else {
          console.log('No saved tasbeehs found');
          setTasbeehs([]);
        }
      } catch (error) {
        console.error('Error loading tasbeehs:', error);
        setTasbeehs([]);
        // Clear corrupted data
        localStorage.removeItem('tasbeehs');
      } finally {
        setLoading(false);
      }
    };

    loadTasbeehs();
  }, []);

  // Save tasbeehs to localStorage whenever tasbeehs state changes
  useEffect(() => {
    if (!loading) { // Only save after initial load
      try {
        localStorage.setItem('tasbeehs', JSON.stringify(tasbeehs));
        console.log('Saved to localStorage:', tasbeehs);
      } catch (error) {
        console.error('Error saving tasbeehs:', error);
      }
    }
  }, [tasbeehs, loading]);

  // Add loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <div className="text-green-600">Loading your tasbeehs...</div>
      </div>
    );
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: name === 'goal' ? parseInt(value) || 0 : value 
    }));
  };

  const handleCreateTasbeeh = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newTasbeeh = {
      id: Date.now().toString(),
      name: form.name.trim(),
      goal: form.goal,
      count: 0,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasbeehs(prev => [...prev, newTasbeeh]);
    setForm({ name: "", goal: 33 });
    setShowModal(false);
  };

  const handleUpdateTasbeeh = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !editingTasbeeh) return;

    setTasbeehs(prev => 
      prev.map(tasbeeh => 
        tasbeeh.id === editingTasbeeh.id 
          ? { ...tasbeeh, name: form.name.trim(), goal: form.goal }
          : tasbeeh
      )
    );
    
    setForm({ name: "", goal: 33 });
    setEditingTasbeeh(null);
    setShowModal(false);
  };

  const handleEditClick = (tasbeeh) => {
    setEditingTasbeeh(tasbeeh);
    setForm({ name: tasbeeh.name, goal: tasbeeh.goal });
    setShowModal(true);
  };

  const handleDeleteTasbeeh = (tasbeehId) => {
    setShowDeleteConfirm(tasbeehId);
  };

  const confirmDelete = () => {
    setTasbeehs(prev => prev.filter(tasbeeh => tasbeeh.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
  };

  const handleIncrement = (tasbeehId) => {
    setTasbeehs(prev => 
      prev.map(tasbeeh => {
        if (tasbeeh.id === tasbeehId) {
          const newCount = tasbeeh.count + 1;
          const wasCompleted = tasbeeh.count >= tasbeeh.goal;
          const isNowCompleted = newCount >= tasbeeh.goal;
          
          // Show celebration if goal just achieved
          if (!wasCompleted && isNowCompleted) {
            setShowCelebration({
              id: tasbeehId,
              name: tasbeeh.name,
              goal: tasbeeh.goal
            });
            
            // Auto hide celebration after 3 seconds
            setTimeout(() => {
              setShowCelebration(null);
            }, 3000);
          }
          
          return {
            ...tasbeeh,
            count: newCount,
            completedAt: isNowCompleted && !wasCompleted ? new Date().toISOString() : tasbeeh.completedAt
          };
        }
        return tasbeeh;
      })
    );
  };

  const handleReset = (tasbeehId) => {
    setShowResetConfirm(tasbeehId);
  };

  const confirmReset = () => {
    setTasbeehs(prev => 
      prev.map(tasbeeh => 
        tasbeeh.id === showResetConfirm 
          ? { ...tasbeeh, count: 0, completedAt: null }
          : tasbeeh
      )
    );
    setShowResetConfirm(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTasbeeh(null);
    setForm({ name: "", goal: 33 });
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-800">📿 Digital Tasbeeh</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white p-3 sm:p-2 rounded-full hover:bg-green-700 transition-colors self-start sm:self-auto shadow-lg"
          title="Add New Tasbeeh"
        >
          <FaPlus size={16} />
        </button>
      </div>

      {/* Tasbeehs Display */}
      {tasbeehs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tasbeehs.map((tasbeeh) => {
            const progress = (tasbeeh.count / tasbeeh.goal) * 100;
            const isCompleted = tasbeeh.count >= tasbeeh.goal;
            
            return (
              <div
                key={tasbeeh.id}
                className={`relative rounded-xl p-6 border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-400 shadow-lg'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2 shadow-lg">
                    <FaTrophy size={12} />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-1">
                  <button
                    onClick={() => handleEditClick(tasbeeh)}
                    className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-colors"
                    title="Edit Tasbeeh"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDeleteTasbeeh(tasbeeh.id)}
                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                    title="Delete Tasbeeh"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>

                {/* Tasbeeh Name */}
                <h3 className={`font-semibold mb-4 pr-16 text-lg ${
                  isCompleted ? 'text-amber-800' : 'text-green-800'
                }`}>
                  {tasbeeh.name}
                </h3>

                {/* Progress Circle */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={isCompleted ? "#f59e0b" : "#e5e7eb"}
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={isCompleted ? "#d97706" : "#10b981"}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${
                        isCompleted ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {tasbeeh.count}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goal and Progress */}
                <div className="text-center mb-4">
                  <p className={`text-sm ${isCompleted ? 'text-amber-600' : 'text-green-600'}`}>
                    Goal: {tasbeeh.goal}
                  </p>
                  <p className={`text-xs ${isCompleted ? 'text-amber-500' : 'text-green-500'}`}>
                    {Math.round(progress)}% Complete
                  </p>
                  {isCompleted && tasbeeh.completedAt && (
                    <p className="text-xs text-amber-500 mt-1">
                      ✨ Completed: {new Date(tasbeeh.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIncrement(tasbeeh.id)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      isCompleted
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleReset(tasbeeh.id)}
                    className="px-3 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
                    title="Reset Counter"
                  >
                    <FaUndo size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📿</div>
          <p className="text-green-600 text-lg mb-4">No tasbeeh counters found.</p>
          <p className="text-green-500 text-sm mb-6 italic">
            "And remember your Lord much and exalt [Him with praise] in the evening and the morning." - Quran 3:41
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Create Your First Tasbeeh
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center border-t-4 border-red-500 shadow-2xl transform animate-pulse">
            <div className="bg-red-100 rounded-full p-4 w-fit mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Delete Tasbeeh?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to delete this tasbeeh counter? This action cannot be undone and all progress will be lost.
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

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center border-t-4 border-amber-500 shadow-2xl">
            <div className="bg-amber-100 rounded-full p-4 w-fit mx-auto mb-6">
              <FaUndo className="text-amber-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Reset Counter?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This will reset your tasbeeh counter back to 0. Your progress will be lost but the tasbeeh will remain.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-xl hover:bg-amber-600 transition-colors font-medium shadow-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-t-4 border-green-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-green-800">
                📿 {editingTasbeeh ? 'Edit Tasbeeh' : 'Add New Tasbeeh'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={editingTasbeeh ? handleUpdateTasbeeh : handleCreateTasbeeh} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Tasbeeh Name (e.g., SubhanAllah) *"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              
              <input
                type="number"
                name="goal"
                value={form.goal}
                onChange={handleFormChange}
                placeholder="Goal (e.g., 33, 99, 100) *"
                min="1"
                max="10000"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {editingTasbeeh ? 'Update Tasbeeh' : 'Add Tasbeeh'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}








