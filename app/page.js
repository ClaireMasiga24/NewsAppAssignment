'use client'

import { useState, useContext } from 'react'
import { NewsContext } from './context/NewsContext'
import EditArticleModal from './components/EditArticleModal'

export default function Home() {
  const { news, loading, error, deleteArticle, updateArticle, darkMode, toggleDarkMode } = useContext(NewsContext)
  const [editingArticle, setEditingArticle] = useState(null)

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 p-6">
        <div className="lg:col-span-2 flex flex-col md:flex-row justify-center items-center mb-8 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 z-10 rounded-xl px-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            Claire News
          </h1>
          <div className="flex items-center space-x-4 absolute right-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {news.length > 0 && (
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              {news[0].urlToImage && (
                <img 
                  src={news[0].urlToImage} 
                  alt={news[0].title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-600 text-white">
                    {news[0].source?.name || 'Breaking'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {new Date(news[0].publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {news[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {news[0].description}
                </p>
                <a 
                  href={news[0].url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read Full Story →
                </a>
              </div>
            </article>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {news.slice(1).map((article) => (
              <article 
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
              >
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {article.source?.name || 'General'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read more
                    </a>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Latest Updates</h3>
            <div className="space-y-4">
              {news.slice(0, 3).map((article) => (
                <div key={article.id} className="border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-800 dark:text-white">{article.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {editingArticle && (
        <EditArticleModal 
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
        />
      )}
    </main>
  )
}
