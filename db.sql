CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role ENUM('planner', 'spouse') NOT NULL,
    password VARCHAR(255) NOT NULL,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE theme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    visibility BOOLEAN DEFAULT TRUE,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rue INT,
    libelle VARCHAR(255),
    voie VARCHAR(255),
    cp VARCHAR(10),
    complement_adresse VARCHAR(255),
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100),
    company_name VARCHAR(150),
    address_id INT,
    email VARCHAR(150),
    service_type VARCHAR(100),
    include_meal BOOLEAN DEFAULT TRUE,
    validate BOOLEAN DEFAULT FALSE,
    visibility BOOLEAN DEFAULT TRUE,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE formula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    vendor_id INT,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendor(id)
);

CREATE TABLE guest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20),
    address_id INT,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE wedding (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(36) NOT NULL UNIQUE,
    theme_id INT,
    planner_id INT NOT NULL,
    primary_spouse_id INT NOT NULL,
    secondary_spouse_id INT NOT NULL,
    visibility BOOLEAN DEFAULT TRUE,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (theme_id) REFERENCES theme(id),
    FOREIGN KEY (planner_id) REFERENCES user(id),
    FOREIGN KEY (primary_spouse_id) REFERENCES user(id),
    FOREIGN KEY (secondary_spouse_id) REFERENCES user(id)
);

CREATE TABLE kanban (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    status VARCHAR(100) NOT NULL,
    color VARCHAR(7),
    `order` INT DEFAULT 0,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id)
);

CREATE TABLE `table` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    number INT NOT NULL,
    name VARCHAR(100),
    capacity INT,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id)
);

CREATE TABLE ceremony (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    type ENUM('civil_ceremony', 'religious_ceremony', 'cocktail_hour', 'reception') NOT NULL,
    address_id INT,
    ceremony_dateTime DATETIME,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id),
    FOREIGN KEY (address_id) REFERENCES address(id)
);

CREATE TABLE asset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    new_name VARCHAR(255) NOT NULL,
    old_name VARCHAR(255) NOT NULL,
    context ENUM('site', 'gallery', 'invitation') NOT NULL,
    visibility BOOLEAN DEFAULT TRUE,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id)
);

CREATE TABLE wedding_vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    vendor_id INT NOT NULL,
    formula_id INT,
    visibility BOOLEAN DEFAULT TRUE,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id),
    FOREIGN KEY (vendor_id) REFERENCES vendor(id),
    FOREIGN KEY (formula_id) REFERENCES formula(id)
);

CREATE TABLE wedding_guest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wedding_id INT NOT NULL,
    guest_id INT NOT NULL,
    role ENUM('witness', 'maid_of_honor', 'best_man', 'guest') DEFAULT 'guest',
    invited_by INT,
    presence BOOLEAN DEFAULT FALSE,
    table_id INT,
    plus_one BOOLEAN DEFAULT FALSE,
    plus_one_name VARCHAR(200),
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (wedding_id) REFERENCES wedding(id),
    FOREIGN KEY (guest_id) REFERENCES guest(id),
    FOREIGN KEY (invited_by) REFERENCES user(id),
    FOREIGN KEY (table_id) REFERENCES `table`(id)
);

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kanban_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    `order` INT DEFAULT 0,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kanban_id) REFERENCES kanban(id)
);

CREATE TABLE task_asset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    asset_id INT NOT NULL,
    creationDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES task(id),
    FOREIGN KEY (asset_id) REFERENCES asset(id)
);