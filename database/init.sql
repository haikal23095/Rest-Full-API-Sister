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
(1, '10-A', '10'),
(2, '10-B', '10'),
(3, '10-C', '10'),
(4, '10-D', '10'),
(5, '11-IPA-1', '11'),
(6, '11-IPA-2', '11'),
(7, '11-IPS-1', '11'),
(8, '11-IPS-2', '11'),
(9, '12-IPA-1', '12'),
(10, '12-IPA-2', '12'),
(11, '12-IPS-1', '12'),
(12, '12-IPS-2', '12'),
(13, '10-E', '10'),
(14, '10-F', '10'),
(15, '11-IPA-3', '11'),
(16, '11-IPS-3', '11'),
(17, '12-IPA-3', '12'),
(18, '12-IPS-3', '12'),
(19, '10-G', '10'),
(20, '11-Bahasa', '11');

--
-- Data untuk tabel `guru` (20 data)
-- `kelas_id` adalah FK untuk wali kelas, kita buat 1-to-1 dengan kelas 1-20
--
INSERT INTO guru (guru_id, nama_guru, nip, subject, kelas_id) VALUES
(1, 'Budi Santoso', '198001012005011001', 'Matematika', 1),
(2, 'Ani Yudhoyono', '198202022006022002', 'Fisika', 2),
(3, 'Candra Wijaya', '198503032008031003', 'Kimia', 3),
(4, 'Dewi Lestari', '198304042007042004', 'Biologi', 4),
(5, 'Eka Prasetya', '199005052010051005', 'Bahasa Indonesia', 5),
(6, 'Fajar Nugroho', '198806062009061006', 'Bahasa Inggris', 6),
(7, 'Gita Permata', '199207072012072007', 'Sejarah', 7),
(8, 'Haris Maulana', '198708082011081008', 'Geografi', 8),
(9, 'Indah Cahyani', '199109092013092009', 'Ekonomi', 9),
(10, 'Jaya Kusuma', '198610102010101010', 'Sosiologi', 10),
(11, 'Kiki Amelia', '199311112015112011', 'PKN', 11),
(12, 'Lintang Wibowo', '198912122014121012', 'Seni Budaya', 12),
(13, 'Mega Mendung', '198401132009012013', 'Olahraga', 13),
(14, 'Nina Kirana', '199402142016022014', 'TIK', 14),
(15, 'Oscar Pranata', '198103152006031015', 'Bahasa Arab', 15),
(16, 'Putri Handayani', '199504162017042016', 'Bahasa Mandarin', 16),
(17, 'Qorri As-Sidiq', '198005172005051017', 'Bahasa Jepang', 17),
(18, 'Rama Wijaya', '199606182018061018', 'Kewirausahaan', 18),
(19, 'Sinta Dewi', '198307192007072019', 'Akuntansi', 19),
(20, 'Tora Sudiro', '199008202012081020', 'Antropologi', 20);

--
-- Data untuk tabel `murid` (20 data)
-- Kita sebar 20 murid ini ke 20 kelas yang ada (1 murid per kelas)
--
INSERT INTO murid (murid_id, nama_murid, nis, alamat, kelas_id) VALUES
(1, 'Agung Saputra', '1001', 'Jl. Merdeka No. 1, Jakarta', 1),
(2, 'Bayu Prakoso', '1002', 'Jl. Sudirman No. 2, Bandung', 2),
(3, 'Citra Lestari', '1003', 'Jl. Diponegoro No. 3, Surabaya', 3),
(4, 'Dito Anggoro', '1004', 'Jl. Gajah Mada No. 4, Semarang', 4),
(5, 'Elang Perkasa', '1005', 'Jl. Pahlawan No. 5, Yogyakarta', 5),
(6, 'Fani Mutiara', '1006', 'Jl. Kartini No. 6, Medan', 6),
(7, 'Gilang Ramadhan', '1007', 'Jl. Imam Bonjol No. 7, Makassar', 7),
(8, 'Hana Pertiwi', '1008', 'Jl. Pattimura No. 8, Palembang', 8),
(9, 'Ilham Kurniawan', '1009', 'Jl. Teuku Umar No. 9, Bali', 9),
(10, 'Jihan Nabila', '1010', 'Jl. Gatot Subroto No. 10, Balikpapan', 10),
(11, 'Kania Dewi', '1011', 'Jl. A. Yani No. 11, Malang', 11),
(12, 'Lutfi Hakim', '1012', 'Jl. Siliwangi No. 12, Bogor', 12),
(13, 'Mita Arsita', '1013', 'Jl. Hasanuddin No. 13, Padang', 13),
(14, 'Nabil Hidayat', '1014', 'Jl. Soekarno Hatta No. 14, Pekanbaru', 14),
(15, 'Oki Setiawan', '1015', 'Jl. Thamrin No. 15, Lampung', 15),
(16, 'Pratiwi Wulandari', '1016', 'Jl. Asia Afrika No. 16, Manado', 16),
(17, 'Qia Ramadhani', '1017', 'Jl. Veteran No. 17, Samarinda', 17),
(18, 'Rian Hidayat', '1018', 'Jl. Cendrawasih No. 18, Jayapura', 18),
(19, 'Siska Amelia', '1019', 'Jl. Kenari No. 19, Pontianak', 19),
(20, 'Tedi Firmansyah', '1020', 'Jl. Merpati No. 20, Ambon', 20);

--
-- Data untuk tabel `jadwal_pelajaran` (20 data)
-- Kita buat jadwal acak, menghubungkan guru 1-20 dan kelas 1-20
--
INSERT INTO jadwal_pelajaran (pelajaran_id, hari, waktu, kelas_id, guru_id) VALUES
(1, 'Senin', '07:00:00', 1, 1),
(2, 'Senin', '08:00:00', 2, 2),
(3, 'Senin', '09:00:00', 3, 3),
(4, 'Senin', '10:00:00', 4, 4),
(5, 'Selasa', '07:00:00', 5, 5),
(6, 'Selasa', '08:00:00', 6, 6),
(7, 'Selasa', '09:00:00', 7, 7),
(8, 'Selasa', '10:00:00', 8, 8),
(9, 'Rabu', '07:00:00', 9, 9),
(10, 'Rabu', '08:00:00', 10, 10),
(11, 'Rabu', '09:00:00', 11, 11),
(12, 'Rabu', '10:00:00', 12, 12),
(13, 'Kamis', '07:00:00', 13, 13),
(14, 'Kamis', '08:00:00', 14, 14),
(15, 'Kamis', '09:00:00', 15, 15),
(16, 'Kamis', '10:00:00', 16, 16),
(17, 'Jumat', '07:00:00', 17, 17),
(18, 'Jumat', '08:00:00', 18, 18),
(19, 'Jumat', '09:00:00', 19, 19),
(20, 'Jumat', '10:00:00', 20, 20);

--
-- Data untuk tabel `nilai` (20 data)
-- Setiap murid (1-20) mendapat satu nilai dari guru (1-20)
-- Kolom `subject` diisi berdasarkan `subject` dari `guru_id` yang bersangkutan
--
INSERT INTO nilai (nilai_id, murid_id, subject, nilai, guru_id) VALUES
(1, 1, 'Matematika', 85, 1),
(2, 2, 'Fisika', 90, 2),
(3, 3, 'Kimia', 78, 3),
(4, 4, 'Biologi', 88, 4),
(5, 5, 'Bahasa Indonesia', 92, 5),
(6, 6, 'Bahasa Inggris', 76, 6),
(7, 7, 'Sejarah', 80, 7),
(8, 8, 'Geografi', 85, 8),
(9, 9, 'Ekonomi', 95, 9),
(10, 10, 'Sosiologi', 70, 10),
(11, 11, 'PKN', 77, 11),
(12, 12, 'Seni Budaya', 83, 12),
(13, 13, 'Olahraga', 89, 13),
(14, 14, 'TIK', 91, 14),
(15, 15, 'Bahasa Arab', 79, 15),
(16, 16, 'Bahasa Mandarin', 81, 16),
(17, 17, 'Bahasa Jepang', 87, 17),
(18, 18, 'Kewirausahaan', 93, 18),
(19, 19, 'Akuntansi', 75, 19),
(20, 20, 'Antropologi', 82, 20);