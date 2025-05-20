'use client'

import { useState, useContext } from 'react'
import { NewsContext } from '../context/NewsContext'

export default function EditArticleModal({ article, onClose }) {
  const [title, setTitle] = useState(article.title)
  const [description, setDescription] = useState(article.description)
  const [url, setUrl] = useState(article.url)
  const [urlToImage, setUrlToImage] = useState(article.urlToImage)
  const { updateArticle } = useContext(NewsContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateArticle(article.id, {
      ...article,
      title,
      description,
      url,
      urlToImage
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Article</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={urlToImage}
              onChange={(e) => setUrlToImage(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
