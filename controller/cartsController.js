import pool from '../database/index.js'

export const addToCart = async (req, res) => {
  const { userid, productid, quantity } = req.body
  try {
    await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity) VALUES ('${userid}', '${productid}', '${quantity}')`,
    )

    res.status(200).json({ message: 'Add to cart successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getCartItems = async (req, res) => {
  const { userid } = req.query
  try {
    const result = await pool.query(
      `SELECT * FROM (SELECT * FROM cart WHERE user_id = '${userid}') AS a LEFT JOIN product ON a.product_id = product.product_id`,
    )

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteCartItem = async (req, res) => {
  const { id } = req.params

  try {
    await pool.query(
      `DELETE FROM cart
      WHERE id = '${id}'`,
    )
    res.status(200).json({ message: 'Delete successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateCartItem = async (req, res) => {
  const { id } = req.params
  const { quantity } = req.body

  try {
    await pool.query(
      `UPDATE cart
      SET quantity = '${quantity}'
      WHERE id = '${id}'`,
    )
    res.status(200).json({ message: 'Update successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}