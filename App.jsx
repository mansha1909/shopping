import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const addItem = (event) => {
    event.preventDefault(); // Prevent form from causing a page reload
    if (itemName && quantity && price) {
      const newItem = {
        name: itemName,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        subtotal: parseFloat(quantity) * parseFloat(price)
      }
      setItems([...items, newItem])
      setItemName('')
      setQuantity('')
      setPrice('')
    }
  }

  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  return (
    <div className="app">
      <h1>Shopping Bill Calculator</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
          step="0.01"
        />
        <input
          type="number"
          placeholder="Price per unit"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="bill">
        <h2>Bill</h2>
        {items.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td><strong>${total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>
    </div>
  )
}

export default App
