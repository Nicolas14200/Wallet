`CREATE TABLE IF NOT EXISTS 'transaction'
(
    id VARCHAR(65) NOT NULL,
    is_online TINYINT(1),
    is_completed TINYINT(1),
    split VARCHAR(65) NOT NULL,
    store_name VARCHAR(65) NOT NULL,
    customer_id VARCHAR(65) NOT NULL
)`
