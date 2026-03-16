export type Locale = "id" | "en";

const en = {
  meta: {
    htmlLang: "en",
    numberLocale: "en-US",
    dateLocale: "en-US",
    languageSwitcherLabel: "Choose language",
  },
  navbar: {
    home: "Home",
    privacy: "Privacy",
    deleteAccount: "Delete Account",
  },
  footer: {
    tagline: "Master the Code, Rule the Kingdom",
    privacyPolicy: "Privacy Policy",
    deleteAccount: "Delete Account",
    contact: "Contact",
    rightsReserved: "All rights reserved.",
  },
  index: {
    heroTitle: "Master the Code, Rule the Kingdom",
    heroDescription:
      "Embark on a fantasy-themed coding adventure. Learn programming by battling bosses, completing quests, and building your own magical kingdom.",
    downloadCta: "Download on Google Play",
    privacyCta: "Privacy Policy",
    featuresTitle: "Your Coding Quest Awaits",
    features: [
      {
        title: "Magical Syntax",
        desc: "Learn real programming concepts wrapped in enchanting spell-casting mechanics.",
      },
      {
        title: "Epic Boss Battles",
        desc: "Test your coding skills against fearsome bosses in thrilling combat challenges.",
      },
      {
        title: "Kingdom Quests",
        desc: "Explore a vast fantasy world filled with coding puzzles and hidden treasures.",
      },
      {
        title: "Story-Driven Learning",
        desc: "Immerse yourself in rich narratives that make every lesson an adventure.",
      },
      {
        title: "Skill Trees & Badges",
        desc: "Unlock powerful abilities and earn legendary badges as you master new topics.",
      },
    ],
    screenshotsTitle: "A Glimpse Into the Kingdom",
    screenshots: [
      {
        title: "Login Gate",
        desc: "A clean entry portal that welcomes every player into the kingdom with a quick sign-in flow.",
      },
      {
        title: "Royal Home Hub",
        desc: "Your central command room for tracking coins, daily goals, and the next adventure waiting to begin.",
      },
      {
        title: "Topic Select",
        desc: "Pick the branch of knowledge you want to conquer and start shaping your own magical learning path.",
      },
      {
        title: "Level Map",
        desc: "A quest-map style progression screen that turns each lesson into a destination worth unlocking.",
      },
      {
        title: "Story Preview",
        desc: "Narrative-driven lessons pull players into the lore before concepts turn into practical coding missions.",
      },
      {
        title: "Quiz Battle",
        desc: "Knowledge checks feel like encounters, keeping practice sharp, focused, and tied to the adventure.",
      },
      {
        title: "Progress Tracker",
        desc: "A dedicated progress view makes growth visible, from completed paths to rewards earned along the way.",
      },
      {
        title: "My Character",
        desc: "Customize your hero and give the learning journey a personal identity that feels earned.",
      },
      {
        title: "Kingdom Shop",
        desc: "Spend hard-earned coins on premium-looking upgrades that reinforce the game's reward loop.",
      },
    ],
    trustTitle: "Your Trust Matters",
    trustDescription:
      "We care about your privacy and give you full control over your data. Read our policies or manage your account anytime.",
    deleteAccountCta: "Delete Account",
  },
  privacyPolicy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 16, 2026",
    sections: [
      {
        title: "Overview",
        content:
          "This Privacy Policy applies to the Coding Fantasy mobile game and its companion web pages, including the Privacy Policy and Delete Account pages. Coding Fantasy is a fantasy-themed educational game that stores account, gameplay, and purchase-related data so the app can authenticate players, preserve progress, and provide account management features.",
      },
      {
        title: "Information We Collect",
        content:
          "Depending on how you use the service, we may collect your email address, Google account profile information that you authorize during sign-in, your username, avatar URL, equipped character selection, level, EXP, coins, story completion records, quiz results, badge unlocks, boss completion records, daily quest progress, leaderboard-related profile data, and coin purchase claim records such as product ID, order ID, purchase token, purchase state, and related timestamps.",
      },
      {
        title: "How We Use Information",
        content:
          "We use this information to sign you in, create and maintain your player profile, save gameplay progress, calculate level and reward changes, unlock badges, maintain leaderboard data, verify eligible coin purchases, support the Delete Account flow, and operate the Coding Fantasy experience across the mobile app and related web pages.",
      },
      {
        title: "Authentication and Google Sign-In",
        content:
          "Coding Fantasy uses Supabase Auth for authentication. The current app flow relies on Google Sign-In or Google OAuth rather than guest login. When you sign in with Google, we may receive basic account information such as your email address and profile picture, subject to the permissions and information made available by your Google account.",
      },
      {
        title: "Backend and Storage",
        content:
          "Coding Fantasy uses Supabase as its backend platform for authentication, database storage, and Edge Functions. Account and gameplay data are stored in Supabase-managed PostgreSQL tables. The current backend implementation uses authenticated access controls and row-level security policies for player-owned data in the main gameplay tables.",
      },
      {
        title: "Gameplay, Progress, and Leaderboards",
        content:
          "The service stores gameplay-related records so your account can keep track of progression and rewards. This includes profile progression such as level, EXP, and coins, as well as level-node completions, story rewards, quiz rewards, boss rewards, badge unlocks, daily quest status, and leaderboard-related profile fields such as username, avatar URL, and level.",
      },
      {
        title: "In-App Purchases",
        content:
          "On Android, Coding Fantasy supports optional coin purchases through Google Play Billing. The current implementation verifies purchase data through a Supabase Edge Function that communicates with the Google Play Developer API before awarding coins. We may store product identifiers, order identifiers, purchase tokens, package names, purchase state, awarded coin amounts, and related timestamps. We do not process or store your payment card details directly.",
      },
      {
        title: "Third-Party Services",
        content:
          "The current implementation relies primarily on Google services for sign-in and Google Play purchase processing, and on Supabase for authentication, storage, database operations, and server-side functions. We do not sell your personal data. We only share data with service providers when it is necessary to operate the app, process sign-in, verify purchases, or support account-related features.",
      },
      {
        title: "Account Deletion",
        content:
          "You can request account deletion through the Delete Account page on the Coding Fantasy web companion. The current delete-account function is designed to remove the authenticated account and related records including the profile, gameplay progress records, badge unlocks, daily quest progress, and coin purchase claim records associated with that user, then delete the authentication account itself.",
      },
      {
        title: "Data Retention",
        content:
          "We retain account and gameplay data while your account remains active so the service can provide saved progress and account functionality. If you request deletion and the delete flow completes successfully, the current implementation attempts to delete the associated account and related gameplay records immediately. We may still retain limited data where required for security, fraud prevention, operational integrity, or legal compliance.",
      },
      {
        title: "Security",
        content:
          "The current service uses secure authentication flows, HTTPS/TLS network communication, and backend access controls provided through Supabase. While no system can guarantee absolute security, we take reasonable steps within the implemented architecture to protect account and gameplay data.",
      },
      {
        title: "Children's Privacy",
        content:
          "Coding Fantasy is intended for a general audience interested in learning programming. If you believe personal information has been provided to us by a child in a way that should be removed or reviewed, please contact us using the address below so we can assess the request.",
      },
      {
        title: "Contact Information",
        content:
          "If you have questions about this Privacy Policy or your account data, please contact us at asteriaacademy.id@gmail.com.",
      },
    ],
  },
  authCallback: {
    signInFailed: "Sign-In Failed",
    backToDeleteAccount: "Back to Delete Account",
    finishingSignIn: "Finishing Sign-In",
    finishingDescription:
      "Completing your secure login and returning you to account deletion.",
    genericError: "Authentication failed.",
    missingSessionError: "No authenticated session returned from Supabase.",
  },
  notFound: {
    message: "Oops! Page not found",
    action: "Return to Home",
  },
  deleteAccount: {
    title: "Delete Account",
    subtitle: "Permanently remove your Coding Fantasy account and data",
    confirmText: "DELETE MY ACCOUNT",
    deleteInfo: {
      title: "What Happens When You Delete",
      items: [
        "Your authentication account will be permanently removed",
        "Your profile, username, and avatar will be deleted",
        "All gameplay progress including quests, quiz scores, and boss completions",
        "Skill tree unlocks and badge achievements",
        "In-app purchase records (coins and transaction history)",
        "Daily quest progress and leaderboard entries",
      ],
      note:
        "This action is irreversible. Some anonymized or aggregated data may be retained as permitted by law.",
    },
    signInCard: {
      title: "Sign In to Continue",
      description:
        "To securely delete your account, please sign in with the same Google account you use in the Coding Fantasy app.",
      signInButton: "Sign In with Google",
      signInHelp:
        "After Google sign-in, you will be redirected back to this page to complete the deletion flow.",
      manualHelpPrefix: "Can't sign in? Contact us at",
      manualHelpSuffix: "to request manual account deletion.",
      missingRedirectError: "Supabase did not return an OAuth redirect URL.",
    },
    deletedState: {
      title: "Account Deleted",
      description:
        "Your Coding Fantasy account and all associated data have been permanently deleted. We're sorry to see you go.",
      help:
        "If you have any questions about your deleted data or need further assistance, please contact us at",
    },
    dangerZone: {
      title: "Danger Zone",
      description:
        "Once you delete your account, there is no way to recover it. All your progress, achievements, and purchased items will be permanently lost.",
    },
    confirmation: {
      checkbox:
        "I understand that deleting my account is permanent and irreversible, and that all my data will be lost.",
      inputLabelPrefix: "Type",
      inputLabelSuffix: "to confirm:",
      deleteButton: "Permanently Delete My Account",
      deletingButton: "Deleting...",
      unexpectedError: "An unexpected error occurred.",
      noSessionError: "No active session",
      fallbackSummaryWarning:
        "We could not load your latest account summary. You can still continue with account deletion.",
    },
    summary: {
      fallbackNoEmail: "No email available",
      fallbackUsername: "Adventurer",
      summaryWarning:
        "Some account stats could not be loaded. You can still continue with account deletion.",
      signedInProfile: "Signed In Profile",
      readyToReview: "Ready to review this account before deletion.",
      syncing: "Syncing latest profile...",
      liveLoaded: "Live account summary loaded",
      levelLabel: "Level",
      coinsLabel: "Coins",
      signOut: "Sign Out",
      experience: "Experience",
      levelUnavailable: "Level data unavailable",
      progressSuffix: "toward next level",
      progressUnavailable:
        "Progress data will appear when your profile sync is available.",
      badges: "Badges",
      nodesCleared: "Nodes Cleared",
      stories: "Stories",
      quizzes: "Quizzes",
      bossWins: "Boss Wins",
      latestDailyQuest: "Latest Daily Quest",
      story: "Story",
      quiz: "Quiz",
      reward: "Reward",
      done: "Done",
      pending: "Pending",
    },
  },
} as const;

const id: typeof en = {
  meta: {
    htmlLang: "id",
    numberLocale: "id-ID",
    dateLocale: "id-ID",
    languageSwitcherLabel: "Pilih bahasa",
  },
  navbar: {
    home: "Beranda",
    privacy: "Privasi",
    deleteAccount: "Hapus Akun",
  },
  footer: {
    tagline: "Kuasai Koding, Taklukkan Kerajaan",
    privacyPolicy: "Kebijakan Privasi",
    deleteAccount: "Hapus Akun",
    contact: "Kontak",
    rightsReserved: "Hak cipta dilindungi.",
  },
  index: {
    heroTitle: "Kuasai Koding, Taklukkan Kerajaan",
    heroDescription:
      "Mulailah petualangan belajar coding bertema fantasi. Pelajari pemrograman lewat pertarungan boss, penyelesaian quest, dan perjalanan membangun kerajaan magismu sendiri.",
    downloadCta: "Unduh di Google Play",
    privacyCta: "Kebijakan Privasi",
    featuresTitle: "Petualangan Kodingmu Menanti",
    features: [
      {
        title: "Sintaks Magis",
        desc: "Pelajari konsep pemrograman nyata yang dibungkus dengan mekanik sihir yang terasa seru.",
      },
      {
        title: "Pertarungan Boss Epik",
        desc: "Uji kemampuan coding melawan boss-boss tangguh dalam tantangan yang menegangkan.",
      },
      {
        title: "Quest Kerajaan",
        desc: "Jelajahi dunia fantasi luas yang dipenuhi puzzle coding dan harta tersembunyi.",
      },
      {
        title: "Belajar dengan Cerita",
        desc: "Masuk ke narasi yang kaya agar setiap pelajaran terasa seperti sebuah petualangan.",
      },
      {
        title: "Skill Tree dan Badge",
        desc: "Buka kemampuan baru dan kumpulkan badge legendaris saat kamu menguasai topik-topik baru.",
      },
    ],
    screenshotsTitle: "Sekilas Isi Kerajaan",
    screenshots: [
      {
        title: "Gerbang Login",
        desc: "Portal masuk yang rapi untuk menyambut pemain ke dalam kerajaan lewat alur sign-in yang cepat.",
      },
      {
        title: "Pusat Komando Utama",
        desc: "Layar utama untuk memantau coin, target harian, dan petualangan berikutnya yang siap dimulai.",
      },
      {
        title: "Pilih Topik",
        desc: "Tentukan cabang pengetahuan yang ingin kamu taklukkan dan bentuk jalur belajar magismu sendiri.",
      },
      {
        title: "Peta Level",
        desc: "Tampilan progres bergaya peta quest yang membuat setiap pelajaran terasa seperti destinasi baru.",
      },
      {
        title: "Preview Cerita",
        desc: "Pelajaran yang didorong narasi mengajak pemain masuk ke lore sebelum konsep berubah jadi misi coding.",
      },
      {
        title: "Pertarungan Kuis",
        desc: "Evaluasi pengetahuan terasa seperti encounter, sehingga latihan tetap tajam dan terikat pada petualangan.",
      },
      {
        title: "Pelacak Progres",
        desc: "Halaman progres khusus yang memperlihatkan pertumbuhanmu, dari jalur yang selesai hingga reward yang didapat.",
      },
      {
        title: "Karakterku",
        desc: "Sesuaikan pahlawanmu dan buat perjalanan belajar terasa lebih personal serta pantas untuk diraih.",
      },
      {
        title: "Toko Kerajaan",
        desc: "Belanjakan coin hasil usahamu untuk upgrade premium yang memperkuat reward loop di dalam game.",
      },
    ],
    trustTitle: "Kepercayaanmu Penting",
    trustDescription:
      "Kami peduli pada privasimu dan memberi kendali penuh atas data akunmu. Baca kebijakan kami atau kelola akun kapan saja.",
    deleteAccountCta: "Hapus Akun",
  },
  privacyPolicy: {
    title: "Kebijakan Privasi",
    lastUpdated: "Terakhir diperbarui: 16 Maret 2026",
    sections: [
      {
        title: "Gambaran Umum",
        content:
          "Kebijakan Privasi ini berlaku untuk game mobile Coding Fantasy dan halaman web pendukungnya, termasuk halaman Kebijakan Privasi dan Hapus Akun. Coding Fantasy adalah game edukasi bertema fantasi yang menyimpan data akun, progres permainan, dan data terkait pembelian agar aplikasi dapat mengautentikasi pemain, menjaga progres, dan menyediakan fitur pengelolaan akun.",
      },
      {
        title: "Informasi yang Kami Kumpulkan",
        content:
          "Tergantung cara Anda menggunakan layanan, kami dapat mengumpulkan alamat email, informasi profil akun Google yang Anda izinkan saat sign-in, username, URL avatar, pilihan karakter yang digunakan, level, EXP, coin, riwayat penyelesaian story, hasil kuis, badge yang terbuka, riwayat penyelesaian boss, progres daily quest, data profil terkait leaderboard, serta catatan klaim pembelian coin seperti product ID, order ID, purchase token, status pembelian, dan timestamp terkait.",
      },
      {
        title: "Cara Kami Menggunakan Informasi",
        content:
          "Kami menggunakan informasi ini untuk melakukan sign-in, membuat dan memelihara profil pemain, menyimpan progres permainan, menghitung perubahan level dan reward, membuka badge, mengelola data leaderboard, memverifikasi pembelian coin yang valid, mendukung alur Hapus Akun, dan menjalankan pengalaman Coding Fantasy di aplikasi mobile dan halaman web terkait.",
      },
      {
        title: "Autentikasi dan Google Sign-In",
        content:
          "Coding Fantasy menggunakan Supabase Auth untuk autentikasi. Alur aplikasi saat ini mengandalkan Google Sign-In atau Google OAuth, bukan guest login. Saat Anda sign-in dengan Google, kami dapat menerima informasi akun dasar seperti alamat email dan foto profil Anda, sesuai izin dan data yang tersedia dari akun Google Anda.",
      },
      {
        title: "Backend dan Penyimpanan",
        content:
          "Coding Fantasy menggunakan Supabase sebagai platform backend untuk autentikasi, penyimpanan database, dan Edge Functions. Data akun dan gameplay disimpan di tabel PostgreSQL yang dikelola Supabase. Implementasi backend saat ini menggunakan kontrol akses terautentikasi dan row-level security untuk data gameplay milik pemain.",
      },
      {
        title: "Gameplay, Progres, dan Leaderboard",
        content:
          "Layanan ini menyimpan catatan gameplay agar akun Anda dapat melacak progres dan reward. Ini mencakup progres profil seperti level, EXP, dan coin, serta penyelesaian level-node, reward story, reward kuis, reward boss, badge unlock, status daily quest, dan field profil terkait leaderboard seperti username, avatar URL, dan level.",
      },
      {
        title: "Pembelian Dalam Aplikasi",
        content:
          "Di Android, Coding Fantasy mendukung pembelian coin opsional melalui Google Play Billing. Implementasi saat ini memverifikasi data pembelian melalui Supabase Edge Function yang berkomunikasi dengan Google Play Developer API sebelum coin diberikan. Kami dapat menyimpan product identifier, order identifier, purchase token, package name, purchase state, jumlah coin yang diberikan, dan timestamp terkait. Kami tidak memproses atau menyimpan detail kartu pembayaran Anda secara langsung.",
      },
      {
        title: "Layanan Pihak Ketiga",
        content:
          "Implementasi saat ini terutama bergantung pada layanan Google untuk sign-in dan pemrosesan pembelian Google Play, serta Supabase untuk autentikasi, penyimpanan, operasi database, dan fungsi sisi server. Kami tidak menjual data pribadi Anda. Kami hanya membagikan data kepada penyedia layanan jika diperlukan untuk menjalankan aplikasi, memproses sign-in, memverifikasi pembelian, atau mendukung fitur terkait akun.",
      },
      {
        title: "Penghapusan Akun",
        content:
          "Anda dapat meminta penghapusan akun melalui halaman Hapus Akun pada web pendamping Coding Fantasy. Fungsi delete-account saat ini dirancang untuk menghapus akun yang sudah terautentikasi beserta data terkait, termasuk profil, catatan progres gameplay, badge unlock, progres daily quest, dan catatan klaim pembelian coin yang terkait dengan user tersebut, lalu menghapus akun autentikasinya.",
      },
      {
        title: "Retensi Data",
        content:
          "Kami menyimpan data akun dan gameplay selama akun Anda masih aktif agar layanan dapat menyediakan progres tersimpan dan fungsi akun. Jika Anda meminta penghapusan dan alur delete berhasil selesai, implementasi saat ini akan mencoba menghapus akun terkait dan data gameplay yang berhubungan secara langsung. Kami masih dapat menyimpan data terbatas jika diperlukan untuk keamanan, pencegahan fraud, integritas operasional, atau kepatuhan hukum.",
      },
      {
        title: "Keamanan",
        content:
          "Layanan saat ini menggunakan alur autentikasi yang aman, komunikasi jaringan HTTPS/TLS, dan kontrol akses backend yang disediakan melalui Supabase. Tidak ada sistem yang dapat menjamin keamanan absolut, tetapi kami mengambil langkah yang wajar dalam arsitektur yang diimplementasikan untuk melindungi data akun dan gameplay.",
      },
      {
        title: "Privasi Anak",
        content:
          "Coding Fantasy ditujukan untuk audiens umum yang tertarik mempelajari pemrograman. Jika Anda meyakini ada informasi pribadi yang diberikan oleh anak dengan cara yang perlu ditinjau atau dihapus, silakan hubungi kami melalui alamat di bawah agar kami dapat menilai permintaan tersebut.",
      },
      {
        title: "Informasi Kontak",
        content:
          "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau data akun Anda, silakan hubungi kami di asteriaacademy.id@gmail.com.",
      },
    ],
  },
  authCallback: {
    signInFailed: "Sign-In Gagal",
    backToDeleteAccount: "Kembali ke Hapus Akun",
    finishingSignIn: "Menyelesaikan Sign-In",
    finishingDescription:
      "Sedang menyelesaikan login aman Anda dan mengembalikan Anda ke halaman hapus akun.",
    genericError: "Autentikasi gagal.",
    missingSessionError: "Tidak ada sesi terautentikasi yang dikembalikan dari Supabase.",
  },
  notFound: {
    message: "Oops! Halaman tidak ditemukan",
    action: "Kembali ke Beranda",
  },
  deleteAccount: {
    title: "Hapus Akun",
    subtitle: "Hapus permanen akun dan data Coding Fantasy Anda",
    confirmText: "HAPUS AKUN SAYA",
    deleteInfo: {
      title: "Apa yang Terjadi Saat Anda Menghapus Akun",
      items: [
        "Akun autentikasi Anda akan dihapus secara permanen",
        "Profil, username, dan avatar Anda akan dihapus",
        "Seluruh progres gameplay termasuk quest, skor kuis, dan penyelesaian boss",
        "Unlock skill tree dan pencapaian badge",
        "Riwayat pembelian dalam aplikasi (coin dan riwayat transaksi)",
        "Progres daily quest dan entri leaderboard",
      ],
      note:
        "Tindakan ini tidak dapat dibatalkan. Sebagian data anonim atau agregat dapat tetap disimpan jika diizinkan oleh hukum.",
    },
    signInCard: {
      title: "Masuk untuk Melanjutkan",
      description:
        "Untuk menghapus akun dengan aman, silakan masuk menggunakan akun Google yang sama dengan yang Anda pakai di aplikasi Coding Fantasy.",
      signInButton: "Masuk dengan Google",
      signInHelp:
        "Setelah Google sign-in, Anda akan diarahkan kembali ke halaman ini untuk menyelesaikan alur penghapusan.",
      manualHelpPrefix: "Tidak bisa masuk? Hubungi kami di",
      manualHelpSuffix: "untuk meminta penghapusan akun secara manual.",
      missingRedirectError: "Supabase tidak mengembalikan URL redirect OAuth.",
    },
    deletedState: {
      title: "Akun Dihapus",
      description:
        "Akun Coding Fantasy Anda dan seluruh data terkait telah dihapus secara permanen. Kami menyesal melihat Anda pergi.",
      help:
        "Jika Anda memiliki pertanyaan tentang data yang telah dihapus atau membutuhkan bantuan lebih lanjut, silakan hubungi kami di",
    },
    dangerZone: {
      title: "Zona Bahaya",
      description:
        "Setelah akun dihapus, tidak ada cara untuk memulihkannya. Seluruh progres, pencapaian, dan item yang pernah dibeli akan hilang permanen.",
    },
    confirmation: {
      checkbox:
        "Saya memahami bahwa penghapusan akun bersifat permanen dan tidak dapat dibatalkan, serta seluruh data saya akan hilang.",
      inputLabelPrefix: "Ketik",
      inputLabelSuffix: "untuk konfirmasi:",
      deleteButton: "Hapus Akun Saya Secara Permanen",
      deletingButton: "Menghapus...",
      unexpectedError: "Terjadi kesalahan yang tidak terduga.",
      noSessionError: "Tidak ada sesi aktif",
      fallbackSummaryWarning:
        "Ringkasan akun terbaru Anda tidak dapat dimuat. Anda tetap bisa melanjutkan penghapusan akun.",
    },
    summary: {
      fallbackNoEmail: "Email tidak tersedia",
      fallbackUsername: "Petualang",
      summaryWarning:
        "Sebagian statistik akun tidak dapat dimuat. Anda tetap bisa melanjutkan penghapusan akun.",
      signedInProfile: "Profil yang Sedang Masuk",
      readyToReview: "Siap meninjau akun ini sebelum dihapus.",
      syncing: "Menyinkronkan profil terbaru...",
      liveLoaded: "Ringkasan akun terbaru berhasil dimuat",
      levelLabel: "Level",
      coinsLabel: "Coin",
      signOut: "Keluar",
      experience: "Pengalaman",
      levelUnavailable: "Data level belum tersedia",
      progressSuffix: "menuju level berikutnya",
      progressUnavailable:
        "Data progres akan tampil saat sinkronisasi profil tersedia.",
      badges: "Badge",
      nodesCleared: "Node Selesai",
      stories: "Story",
      quizzes: "Kuis",
      bossWins: "Boss Menang",
      latestDailyQuest: "Daily Quest Terbaru",
      story: "Story",
      quiz: "Kuis",
      reward: "Reward",
      done: "Selesai",
      pending: "Belum",
    },
  },
} as const;

export type TranslationDictionary = typeof en;

export const translations: Record<Locale, TranslationDictionary> = {
  id,
  en,
};
