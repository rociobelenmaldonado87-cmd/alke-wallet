DROP DATABASE IF EXISTS alke_wallet;

CREATE DATABASE alke_wallet;
USE alke_wallet;

CREATE TABLE usuario (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    saldo DECIMAL(10,2) NOT NULL
);
CREATE TABLE moneda (
    currency_id INT AUTO_INCREMENT PRIMARY KEY,
    currency_name VARCHAR(50) NOT NULL,
    currency_symbol VARCHAR(10) NOT NULL
);
CREATE TABLE transaccion (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_user_id INT NOT NULL,
    receiver_user_id INT NOT NULL,
    currency_id INT NOT NULL,
    importe DECIMAL(10,2) NOT NULL,
    transaction_date DATETIME NOT NULL,

    FOREIGN KEY (sender_user_id) REFERENCES usuario(user_id),
    FOREIGN KEY (receiver_user_id) REFERENCES usuario(user_id),
    FOREIGN KEY (currency_id) REFERENCES moneda(currency_id)
);
SHOW TABLES;
DELIMITER $$

CREATE PROCEDURE cargar_50_transacciones()
BEGIN
    DECLARE i INT DEFAULT 1;

    WHILE i <= 50 DO
        INSERT INTO transaccion (
            sender_user_id,
            receiver_user_id,
            currency_id,
            importe,
            transaction_date
        )
        VALUES (
            FLOOR(1 + (RAND() * 3)),
            FLOOR(1 + (RAND() * 3)),
            FLOOR(1 + (RAND() * 3)),
            ROUND(RAND() * 10000, 2),
            NOW()
        );

        SET i = i + 1;
    END WHILE;
END $$

DELIMITER ;

CALL cargar_50_transacciones();

SELECT COUNT(*) FROM transaccion;

SELECT * FROM transaccion;

SELECT *
FROM transaccion
WHERE sender_user_id = 1;

SELECT u.nombre, t.importe, t.transaction_date
FROM usuario u
JOIN transaccion t ON u.user_id = t.sender_user_id;

SELECT t.transaction_id, m.currency_name, m.currency_symbol, t.importe
FROM transaccion t
JOIN moneda m ON t.currency_id = m.currency_id;

SELECT sender_user_id, COUNT(*) AS total_transacciones
FROM transaccion
GROUP BY sender_user_id;

SELECT sender_user_id, AVG(importe) AS promedio_envios
FROM transaccion
GROUP BY sender_user_id;

SELECT COUNT(*) FROM transaccion;

SELECT DATABASE();
SELECT * FROM transaccion;

INSERT INTO transaccion (sender_user_id, receiver_user_id, currency_id, importe, transaction_date)
VALUES 
(1,2,1,1000,NOW()),
(2,3,2,2000,NOW()),
(3,1,3,1500,NOW()),
(1,3,1,500,NOW()),
(2,1,2,700,NOW()),
(3,2,3,900,NOW()),
(1,2,1,1100,NOW()),
(2,3,2,1300,NOW()),
(3,1,3,1400,NOW()),
(1,3,1,1500,NOW()),
(2,1,2,1600,NOW()),
(3,2,3,1700,NOW()),
(1,2,1,1800,NOW()),
(2,3,2,1900,NOW()),
(3,1,3,2100,NOW()),
(1,3,1,2200,NOW()),
(2,1,2,2300,NOW()),
(3,2,3,2400,NOW()),
(1,2,1,2500,NOW()),
(2,3,2,2600,NOW()),
(3,1,3,2700,NOW()),
(1,3,1,2800,NOW()),
(2,1,2,2900,NOW()),
(3,2,3,3000,NOW()),
(1,2,1,3100,NOW()),
(2,3,2,3200,NOW()),
(3,1,3,3300,NOW()),
(1,3,1,3400,NOW()),
(2,1,2,3500,NOW()),
(3,2,3,3600,NOW()),
(1,2,1,3700,NOW()),
(2,3,2,3800,NOW()),
(3,1,3,3900,NOW()),
(1,3,1,4000,NOW()),
(2,1,2,4100,NOW()),
(3,2,3,4200,NOW()),
(1,2,1,4300,NOW()),
(2,3,2,4400,NOW()),
(3,1,3,4500,NOW()),
(1,3,1,4600,NOW()),
(2,1,2,4700,NOW()),
(3,2,3,4800,NOW()),
(1,2,1,4900,NOW()),
(2,3,2,5000,NOW()),
(3,1,3,5100,NOW()),
(1,3,1,5200,NOW()),
(2,1,2,5300,NOW()),
(3,2,3,5400,NOW()),
(1,2,1,5500,NOW()),
(2,3,2,5600,NOW()),
(3,1,3,5700,NOW()),
(1,3,1,5800,NOW());

SELECT COUNT(*) FROM transaccion;

SELECT COUNT(*) FROM transaccion;

SELECT DATABASE();

SELECT DATABASE();
INSERT INTO transaccion (sender_user_id, receiver_user_id, currency_id, importe, transaction_date)
VALUES (1,2,1,1000,NOW());

SELECT COUNT(*) FROM transaccion;

USE alke_wallet;
SELECT COUNT(*) FROM transaccion;

SELECT DATABASE();
SELECT * FROM transaccion;

SELECT DATABASE();
SELECT COUNT(*) FROM transaccion;

SHOW DATABASES;

USE alke_wallet;
SELECT DATABASE();

SELECT COUNT(*) FROM transaccion;

SELECT COUNT(*) FROM alke_wallet.transaccion;
SELECT COUNT(*) FROM alkewallet.transaccion;