-- Utilisateurs
INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES 
('Alice Dupont', 'alice@example.com', 'motdepasse123'),
('Bob Martin', 'bob@example.com', 'motdepasse456'),
('Charlie Durand', 'charlie@example.com', 'motdepasse789');

-- Comptes
INSERT INTO Compte (utilisateur_id, type_compte, solde) VALUES
(1, 'courant', 1200.00),
(1, 'epargne', 3500.50),
(2, 'courant', 850.25),
(3, 'crypto', 1000.00);

-- Cryptomonnaies
INSERT INTO `cryptomonnaie` (`id`, `nom`, `symbole`, `cours_actuel`, `date_mise_a_jour`, `logo`) VALUES
(1, 'Bitcoin', 'BTC', 50000.00, '2025-04-23 22:13:30', 'https://logo-marque.com/wp-content/uploads/2020/08/Bitcoin-Logo.png'),
(2, 'Ethereum', 'ETH', 3500.75, '2025-04-23 21:49:04', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png'),
(3, 'Solana', 'SOL', 120.40, '2025-04-23 21:49:35', 'https://static.vecteezy.com/system/resources/previews/024/093/312/non_2x/solana-sol-glass-crypto-coin-3d-illustration-free-png.png'),
(4, 'Ripple', 'XRP', 0.75, '2025-04-23 21:50:12', 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/ripple_xrp_coin-512.png');


-- Portefeuilles crypto
INSERT INTO PortefeuilleCrypto (compte_id, cryptomonnaie_id, quantité) VALUES
(4, 1, 0.015),  -- Compte crypto de Charlie a 0.015 BTC
(4, 2, 0.5);    -- Compte crypto de Charlie a 0.5 ETH

-- Transactions
INSERT INTO Transaction (compte_source_id, compte_dest_id, montant, type_transaction, statut) VALUES
(1, 2, 200.00, 'virement', 'validée'),
(2, 1, 50.00, 'virement', 'validée'),
(1, 4, 300.00, 'achat_crypto', 'validée'),
(4, 1, 100.00, 'vente_crypto', 'validée');

-- Achats/Ventes crypto
INSERT INTO AchatVente (compte_id, cryptomonnaie_id, montant, type_operation) VALUES
(4, 1, 300.00, 'achat'),
(4, 2, 150.00, 'achat'),
(4, 1, 100.00, 'vente');
