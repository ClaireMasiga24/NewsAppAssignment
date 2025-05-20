'use client'

import { useState, useContext } from 'react'
import { NewsContext } from '../context/NewsContext'

export default function AddArticleForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [urlToImage, setUrlToImage] = useState('')
  const { addArticle } = useContext(NewsContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newArticle = {
      id: Date.now(),
      title,
      description,
      url,
      urlToImage,
      source: { name: 'User' },
      publishedAt: new Date().toISOString()
    }
    addArticle(newArticle)
    setTitle('')
    setDescription('')
    setUrl('')
    setUrlToImage('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Your News Article</h2>
      <div className="grid gap-4">
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
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Add Article
        </button>
      </div>
    </form>
  )
}
