DOWNLOAD THE FILE EXTRAC IT NIGGUS

NOW GO TO UR FUCKING FOLDER GO TO XAMPP > HTDICK I MEAN HTDOCS > CREATE A FILE NAME IT PIGERRY NOW EXTRACT ALL THE FUCKING FILE TEHRE 

AND TEST IT GO OPEN UR FUCKING XAMPP RUN APACHE AND SQL CHECK IF ITS WORKING

NOW FOR THE DATA BASE GO TO SQL ADMIN U CAN SEE IN FROM UR FUCKING XAMPP

THEN PASTE THIS FROM THE SQL 
ALL OF THAT 


CREATE DATABASE IF NOT EXISTS swine_farmer_services
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE swine_farmer_services;

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    password_hash VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY unique_username (username)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cluster_id INT(11) DEFAULT NULL,

    age INT(10) UNSIGNED NOT NULL,
    sex VARCHAR(64) NOT NULL,
    civil_status VARCHAR(64) NOT NULL,
    municipality VARCHAR(64) NOT NULL,
    barangay VARCHAR(100) NOT NULL,
    education VARCHAR(64) NOT NULL,
    employment VARCHAR(64) NOT NULL,
    income VARCHAR(64) NOT NULL,
    other_income VARCHAR(64) NOT NULL,
    farm_class VARCHAR(64) NOT NULL,
    numswine VARCHAR(64) NOT NULL,
    yearsexp VARCHAR(64) NOT NULL,
    feedprac VARCHAR(64) NOT NULL,
    feedsrc VARCHAR(64) NOT NULL,
    housing VARCHAR(64) NOT NULL,
    watersrc VARCHAR(64) NOT NULL,
    expenses VARCHAR(64) NOT NULL,
    mortality VARCHAR(64) NOT NULL,

    diseases_asf TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    diseases_hogchol TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    diseases_pneumo TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    diseases_diarr TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    diseases_skin TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    diseases_none TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    asf_aware VARCHAR(64) NOT NULL,
    asf_outbreak VARCHAR(64) NOT NULL,
    asf_outbreak_year SMALLINT(5) UNSIGNED DEFAULT NULL,

    asf_symptoms_fever TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_appetite TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_skin TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_vomiting TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_diarrhea TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_breathing TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_sudden_death TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    asf_symptoms_none TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    biosecurity_clean TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    biosecurity_footbath TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    biosecurity_isolation TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    biosecurity_visitors TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    biosecurity_waste TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    biosecurity_none TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    vet_consult VARCHAR(64) NOT NULL,
    disinfect_freq VARCHAR(64) NOT NULL,
    vaccinated VARCHAR(64) NOT NULL,

    info_sources_vet_office TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_agrivet TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_farmers TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_social_media TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_radio_tv TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_seminars TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    info_sources_cooperative TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    support_orgs_pvet TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_municipal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_da TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_barangay TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_cooperative TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_private_vet TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_ngo TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    support_orgs_none TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    needed_services_vet_consultation TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_asf_prevention TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_vaccination TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_disease_diagnosis TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_farm_sanitation TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_feed_nutrition TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_medicine TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_emergency TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_training TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_financial TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    needed_services_none TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    vet_access VARCHAR(64) NOT NULL,
    service_location VARCHAR(64) NOT NULL,

    challenges_lackinfo TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_transport TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_finance TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_lackvet TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_lackmed TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_internet TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    challenges_distance TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,

    satisfaction VARCHAR(64) NOT NULL,
    system_usage VARCHAR(64) NOT NULL,

    PRIMARY KEY (id),
    KEY idx_created_at (created_at),
    KEY idx_cluster_id (cluster_id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
