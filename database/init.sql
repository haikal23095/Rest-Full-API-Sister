-- --------------------------------------------------------
-- BAGIAN 1: PEMBUATAN TABEL (CREATE TABLES)
-- --------------------------------------------------------

--
-- Membuat tabel `kelas` (Tabel Induk)
--
CREATE TABLE kelas (
  kelas_id INT NOT NULL AUTO_INCREMENT,
  nama_kelas VARCHAR(100) NOT NULL,
  grade_level VARCHAR(50) NOT NULL,
  PRIMARY KEY (kelas_id)
) ENGINE=InnoDB;

--
-- Membuat tabel `guru`
-- Relasi: Many-to-One ke `kelas` (sebagai wali kelas)
--
CREATE TABLE guru (
  guru_id INT NOT NULL AUTO_INCREMENT,
  nama_guru VARCHAR(255) NOT NULL,
  nip VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(100) NOT NULL,
  kelas_id INT NULL,
  PRIMARY KEY (guru_id),
  CONSTRAINT fk_guru_kelas
    FOREIGN KEY (kelas_id)
    REFERENCES kelas (kelas_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

--
-- Membuat tabel `murid`
-- Relasi: Many-to-One ke `kelas`
--
CREATE TABLE murid (
  murid_id INT NOT NULL AUTO_INCREMENT,
  nama_murid VARCHAR(255) NOT NULL,
  nis VARCHAR(100) UNIQUE NOT NULL,
  alamat TEXT NULL,
  kelas_id INT NULL,
  PRIMARY KEY (murid_id),
  CONSTRAINT fk_murid_kelas
    FOREIGN KEY (kelas_id)
    REFERENCES kelas (kelas_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

--
-- Membuat tabel `jadwal_pelajaran`
-- Relasi: Many-to-One ke `kelas`
-- Relasi: Many-to-One ke `guru`
--
CREATE TABLE jadwal_pelajaran (
  pelajaran_id INT NOT NULL AUTO_INCREMENT,
  hari VARCHAR(50) NOT NULL,
  waktu TIME NOT NULL,
  kelas_id INT NULL,
  guru_id INT NULL,
  PRIMARY KEY (pelajaran_id),
  CONSTRAINT fk_jadwal_kelas
    FOREIGN KEY (kelas_id)
    REFERENCES kelas (kelas_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_jadwal_guru
    FOREIGN KEY (guru_id)
    REFERENCES guru (guru_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

--
-- Membuat tabel `nilai`
-- Relasi: Many-to-One ke `murid`
-- Relasi: Many-to-One ke `guru`
--
CREATE TABLE nilai (
  nilai_id INT NOT NULL AUTO_INCREMENT,
  murid_id INT NULL,
  subject VARCHAR(100) NOT NULL,
  nilai INT NOT NULL,
  guru_id INT NULL,
  PRIMARY KEY (nilai_id),
  CONSTRAINT fk_nilai_murid
    FOREIGN KEY (murid_id)
    REFERENCES murid (murid_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_nilai_guru
    FOREIGN KEY (guru_id)
    REFERENCES guru (guru_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;


-- --------------------------------------------------------
-- BAGIAN 2: PENGISIAN DATA (INSERT DATA)
-- --------------------------------------------------------

--
-- Data untuk tabel `kelas` (20 data)
--
INSERT INTO kelas (kelas_id, nama_kelas, grade_level) VALUES
(1, '1-A', '1'), (2, '1-B', '1'),
(3, '2-A', '2'), (4, '2-B', '2'),
(5, '3-A', '3'), (6, '3-B', '3'),
(7, '4-A', '4'), (8, '4-B', '4'),
(9, '5-A', '5'), (10, '5-B', '5'),
(11, '6-A', '6'), (12, '6-B', '6');

--
-- Data untuk tabel `guru` (20 data)
-- `kelas_id` adalah FK untuk wali kelas, kita buat 1-to-1 dengan kelas 1-20
--
INSERT INTO guru (guru_id, nama_guru, nip, subject, kelas_id) VALUES
-- Guru Kelas (Wali Kelas)
(1, 'Ibu Aisah', '19800101', 'Guru Kelas 1', 1),
(2, 'Pak Budi', '19800102', 'Guru Kelas 1', 2),
(3, 'Ibu Citra', '19800103', 'Guru Kelas 2', 3),
(4, 'Pak Dani', '19800104', 'Guru Kelas 2', 4),
(5, 'Ibu Elly', '19800105', 'Guru Kelas 3', 5),
(6, 'Pak Feri', '19800106', 'Guru Kelas 3', 6),
(7, 'Ibu Gina', '19800107', 'Guru Kelas 4', 7),
(8, 'Pak Hadi', '19800108', 'Guru Kelas 4', 8),
(9, 'Ibu Indah', '19800109', 'Guru Kelas 5', 9),
(10, 'Pak Joko', '19800110', 'Guru Kelas 5', 10),
(11, 'Ibu Kiki', '19800111', 'Guru Kelas 6', 11),
(12, 'Pak Leman', '19800112', 'Guru Kelas 6', 12),
-- Guru Mapel Khusus (Bukan Wali Kelas)
(13, 'Pak Ust. Maulana', '19900201', 'Pendidikan Agama Islam', NULL),
(14, 'Pak Raga', '19900202', 'PJOK (Olahraga)', NULL),
(15, 'Miss Sarah', '19900203', 'Bahasa Inggris', NULL),
(16, 'Pak Seni', '19900204', 'Seni Budaya', NULL);

--
-- Data untuk tabel `murid` (20 data)
-- Kita sebar 20 murid ini ke 20 kelas yang ada (1 murid per kelas)
--
INSERT INTO murid (murid_id, nama_murid, nis, alamat, kelas_id) VALUES
(1, 'Adit Sopo', 'SD001', 'Jl. Mawar No 1', 1),
(2, 'Bagas Drago', 'SD002', 'Jl. Melati No 2', 1),
(3, 'Cinta Laura', 'SD003', 'Jl. Anggrek No 3', 2),
(4, 'Denis Kancil', 'SD004', 'Jl. Kenanga No 4', 2),
(5, 'Euis Sunda', 'SD005', 'Jl. Dahlia No 5', 3),
(6, 'Fatin Shidqia', 'SD006', 'Jl. Tulip No 6', 3),
(7, 'Gempi Nora', 'SD007', 'Jl. Matahari No 7', 4),
(8, 'Hafiz Quran', 'SD008', 'Jl. Bulan No 8', 4),
(9, 'Ipin Upin', 'SD009', 'Jl. Bintang No 9', 5),
(10, 'Jarjit Singh', 'SD010', 'Jl. Pelangi No 10', 5),
(11, 'Kevin Julio', 'SD011', 'Jl. Awan No 11', 6),
(12, 'Lesti Kejora', 'SD012', 'Jl. Petir No 12', 6),
(13, 'Mail Ayam', 'SD013', 'Jl. Hujan No 13', 7),
(14, 'Nussa Rara', 'SD014', 'Jl. Badai No 14', 8),
(15, 'Opick Tombo', 'SD015', 'Jl. Langit No 15', 9),
(16, 'Poo Teletubbies', 'SD016', 'Jl. Rumput No 16', 10),
(17, 'Qila Qolbu', 'SD017', 'Jl. Embun No 17', 11),
(18, 'Rara Lida', 'SD018', 'Jl. Asap No 18', 11),
(19, 'Sule Prikitiw', 'SD019', 'Jl. Kabut No 19', 12),
(20, 'Tukul Arwana', 'SD020', 'Jl. Danau No 20', 12);

--
-- Data untuk tabel `jadwal_pelajaran` (20 data)
-- Kita buat jadwal acak, menghubungkan guru 1-20 dan kelas 1-20
--
INSERT INTO jadwal_pelajaran (hari, waktu, kelas_id, guru_id) VALUES
-- Senin Upacara & Tematik
('Senin', '07:00:00', 1, 1), -- 1-A dengan Wali Kelasnya
('Senin', '08:00:00', 2, 2), -- 1-B dengan Wali Kelasnya
('Senin', '09:00:00', 3, 3), 
('Senin', '10:00:00', 4, 4),
-- Selasa PJOK & Agama
('Selasa', '07:00:00', 5, 14), -- 3-A PJOK
('Selasa', '08:00:00', 6, 13), -- 3-B Agama
('Selasa', '09:00:00', 7, 7),  -- 4-A Tematik
('Selasa', '10:00:00', 8, 8),  -- 4-B Tematik
-- Rabu Bahasa Inggris & Seni
('Rabu', '07:00:00', 9, 15),  -- 5-A B.Inggris
('Rabu', '08:00:00', 10, 16), -- 5-B Seni
('Rabu', '09:00:00', 11, 11), -- 6-A Tematik
('Rabu', '10:00:00', 12, 12), -- 6-B Tematik
-- Kamis Tematik Lanjutan
('Kamis', '07:00:00', 1, 13), -- 1-A Agama
('Kamis', '08:00:00', 2, 14), -- 1-B PJOK
('Kamis', '09:00:00', 3, 15), -- 2-A B.Inggris
('Kamis', '10:00:00', 4, 16); -- 2-B Seni
--


-- 5. NILAI SISWA (Mapel SD)
--
INSERT INTO nilai (murid_id, subject, nilai, guru_id) VALUES
(1, 'Tematik Tema 1', 85, 1),
(2, 'Tematik Tema 1', 80, 2),
(3, 'Matematika Dasar', 90, 3),
(4, 'Bahasa Indonesia', 88, 4),
(5, 'IPA', 75, 5),
(6, 'IPS', 78, 6),
(7, 'PKN', 92, 7),
(8, 'PJOK', 85, 14),
(9, 'Agama Islam', 95, 13),
(10, 'Seni Budaya', 82, 16),
(11, 'Bahasa Inggris', 70, 15),
(12, 'Matematika', 65, 12), -- Nilai agak kurang :D
(13, 'Tematik Tema 5', 88, 7),
(14, 'PJOK', 90, 14),
(15, 'Agama Islam', 98, 13),
(16, 'Bahasa Inggris', 60, 15),
(17, 'Matematika', 100, 11),
(18, 'IPA', 89, 11),
(19, 'Bahasa Indonesia', 77, 12),
(20, 'Seni Budaya', 95, 16);

-- --------------------------------------------------------
-- TABEL USERS (BARU)
-- --------------------------------------------------------

CREATE TABLE users (
  id_user INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('1', '2') NOT NULL DEFAULT '2', -- 1 = Admin, 2 = User Biasa
  PRIMARY KEY (id_user)
) ENGINE=InnoDB;

-- 
-- Insert Data Dummy User
-- Password asli: "admin123"
-- Kita masukkan hash-nya langsung (ini hasil dari bcrypt untuk "admin123")
--
INSERT INTO users (username, password, role) VALUES 
('admin', '$2b$10$YourHashedPasswordHereWillBeGeneratedByNodeJS', '1');
-- Catatan: Nanti kita buat user lewat API Register saja agar hash-nya valid.