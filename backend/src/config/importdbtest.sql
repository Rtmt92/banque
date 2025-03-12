-- Insérer des utilisateurs
INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES 
('Alice Dupont', 'alice.dupont@example.com', 'motdepasse123'),
('Bob Martin', 'bob.martin@example.com', 'motdepasse456'),
('Charlie Leroy', 'charlie.leroy@example.com', 'motdepasse789');

-- Insérer des comptes pour les utilisateurs
INSERT INTO Compte (utilisateur_id, type_compte, solde) VALUES
(1, 'courant', 1500.50),
(1, 'epargne', 3000.75),
(2, 'courant', 500.25),
(2, 'crypto', 0.00),
(3, 'courant', 750.00);

-- Insérer des transactions entre comptes
INSERT INTO Transaction (compte_source_id, compte_dest_id, montant, type_transaction, statut) VALUES
(1, 3, 200.00, 'virement', 'validée'),
(2, 5, 500.00, 'virement', 'validée'),
(3, 1, 50.00, 'retrait', 'en attente'),
(4, 2, 100.00, 'achat_crypto', 'validée');

-- Insérer des cryptomonnaies
INSERT INTO Cryptomonnaie (nom, symbole, cours_actuel) VALUES
('Bitcoin', 'BTC', 50000.00),
('Ethereum', 'ETH', 3500.75),
('Solana', 'SOL', 120.40),
('Ripple', 'XRP', 0.75);

-- Insérer des cryptos dans les portefeuilles
INSERT INTO PortefeuilleCrypto (utilisateur_id, cryptomonnaie_id, quantité) VALUES
(1, 1, 0.005),  -- Alice a 0.005 BTC
(1, 2, 1.2),    -- Alice a 1.2 ETH
(2, 3, 10),     -- Bob a 10 SOL
(3, 4, 1000);   -- Charlie a 1000 XRP

-- Insérer des achats/ventes de cryptos
INSERT INTO AchatVente (utilisateur_id, cryptomonnaie_id, montant, type_operation) VALUES
(1, 1, 250.00, 'achat'),
(2, 2, 500.00, 'vente'),
(3, 3, 100.00, 'achat');
