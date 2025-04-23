CREATE TABLE Utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Compte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    type_compte ENUM('courant', 'epargne', 'crypto') NOT NULL,
    solde DECIMAL(15,2) DEFAULT 0,
    date_ouverture TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id) ON DELETE CASCADE
);
CREATE TABLE Transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_source_id INT NOT NULL,
    compte_dest_id INT NOT NULL,
    montant DECIMAL(15,2) NOT NULL,
    type_transaction ENUM('virement', 'achat_crypto', 'vente_crypto', 'retrait', 'depot') NOT NULL,
    date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en attente', 'validée', 'annulée') DEFAULT 'en attente',
    FOREIGN KEY (compte_source_id) REFERENCES Compte(id) ON DELETE CASCADE,
    FOREIGN KEY (compte_dest_id) REFERENCES Compte(id) ON DELETE CASCADE
);

CREATE TABLE Cryptomonnaie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    symbole VARCHAR(10) UNIQUE NOT NULL,
    cours_actuel DECIMAL(15,2) NOT NULL,
    date_mise_a_jour TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    logo varchar(255) DEFAULT NULL
);

CREATE TABLE PortefeuilleCrypto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_id INT NOT NULL,
    cryptomonnaie_id INT NOT NULL,
    quantité DECIMAL(15,8) NOT NULL,
    FOREIGN KEY (compte_id) REFERENCES Compte(id) ON DELETE CASCADE,
    FOREIGN KEY (cryptomonnaie_id) REFERENCES Cryptomonnaie(id) ON DELETE CASCADE
);


CREATE TABLE AchatVente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_id INT NOT NULL,
    cryptomonnaie_id INT NOT NULL,
    montant DECIMAL(15,2) NOT NULL,
    type_operation ENUM('achat', 'vente') NOT NULL,
    date_operation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES Compte(id) ON DELETE CASCADE,
    FOREIGN KEY (cryptomonnaie_id) REFERENCES Cryptomonnaie(id) ON DELETE CASCADE
);
