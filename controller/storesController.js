import pool from '../database/index.js'

export const getAllStores = async (req, res) => {
    const { page, pageSize } = req.query
    const offset = (page - 1) * pageSize

    let queryString = `SELECT * FROM store`
    if (page && pageSize)
        queryString = queryString.concat(` OFFSET ${offset} LIMIT ${pageSize}`)

    const totalQuery = `SELECT COUNT(*) FROM store`

    try {
        const result = await pool.query(queryString)
        const total = await pool.query(totalQuery)

        res
            .status(200)
            .json({ data: result.rows, total: parseInt(total.rows[0].count) })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getStore = async (req, res) => {
    const { storeid } = req.params
    let query = `SELECT * FROM store WHERE store_id = '${storeid}'`

    try {
        const result = await pool.query(query)
        res.status(200).json({ data: result.rows[0] })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const addStore = async (req, res) => {
    const {
        name,
        avatar,
        address,
        phone,
        rate,
        time_open,
        time_close,
        type
    } = req.body
    try {
        await pool.query(
            `INSERT INTO store (store_name, avatar, address, phone, rate, time_open, time_close, store_type)
          VALUES
            ('${name}', '${avatar}', '${address}', '${phone}', '${rate}', '${time_open}', '${time_close}', '${type}', )`,
        )
        res.status(200).json({ message: 'Add store successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const editStore = async (req, res) => {
    const { storeid } = req.params
    const {
        name,
        avatar,
        address,
        phone,
        rate,
        time_open,
        time_close,
        type
    } = req.body

    try {
        await pool.query(
            `UPDATE store
        SET
          store_name = '${name}',
          avatar = '${avatar}',
          address = '${address}',
          phone = '${phone}',
          rate = '${rate}',
          time_open = '${time_open}',
          time_close = '${time_close}',
          store_type = '${type}'
        WHERE store_id = '${storeid}'`,
        )
        res.status(200).json({ message: 'Edit store successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteStore = async (req, res) => {
    const { storeid } = req.params

    try {
        await pool.query(
            `DELETE FROM store
        WHERE store_id = '${storeid}'`,
        )
        res.status(200).json({ message: 'Delete store successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}