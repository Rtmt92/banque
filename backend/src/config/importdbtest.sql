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
INSERT INTO Cryptomonnaie (nom, symbole, cours_actuel) VALUES
('Bitcoin', 'BTC', 60000.00),
('Ethereum', 'ETH', 3000.00),
('Solana', 'SOL', 120.00);

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
