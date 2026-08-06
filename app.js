// ===========================
// Firebase Configuration
// ===========================
const firebaseConfig = {
    apiKey: "AIzaSyA2fMsCakmFkM9p22wVyko3FMFuSYO4zFM",
    authDomain: "care-passion-pods.firebaseapp.com",
    projectId: "care-passion-pods",
    storageBucket: "care-passion-pods.firebasestorage.app",
    messagingSenderId: "894486868992",
    appId: "1:894486868992:web:e4c76be9561e1a094194e5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const podsCollection = db.collection("pods");
const activityLogCollection = db.collection("activityLog");
const pageViewsCollection = db.collection("pageViews");

// Log a page view on each load
(function logPageView() {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    pageViewsCollection.add({
        date: today,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.warn("Page view log failed:", err));
})();

// ===========================
// Alias lookup
// ===========================
const aliasMap = {
    "AIGUPTA": "Aishwarya Gupta",
    "ALESLIU": "Alessandra Liu",
    "ALLENWE": "Allen Weiss",
    "AMANJHA": "Aman Jha",
    "AMANSAH": "Aman Sahni",
    "AMAMHE": "Ameer Ahmed",
    "AMUKUMA": "Amit Kumar",
    "AMITKUM": "Amit Kumar",
    "AMULYEA": "Amulya Eedara",
    "ANDYPUN": "Andy Puntacharat",
    "ABOACHI": "Bogdan Alexandru Achim",
    "CHASIG": "Chandan Kumar Singh",
    "CHRLEW": "Chris Lewis",
    "CHRICHAR": "Christian Chavez Castillo",
    "COLINF": "Colin Fritzke",
    "CORYPASA": "Cory Posada",
    "COUGUIM": "Cosmin Guliman",
    "CRISK": "Cristina Knecht",
    "CURTISLE": "Curtis Lewis",
    "DANIMAN": "Dan Manrique",
    "DAVIDEES": "David Vest",
    "DKOUZMA": "Doyko Kouzmanov",
    "ELEANOR": "Eleanor Falla",
    "FLKELLY": "Fletcher Kelly",
    "GMGCAFF": "Geordie (JOR-dee) McGarty",
    "GUMALLE": "Gustavo Mauler",
    "GOLIVEIRA": "Gustavo Oliveira",
    "HACHOW": "Hanisha Chowdary Sava",
    "HENASCHI": "Helder Nascimento",
    "HEVARY": "Hemanth Varyani",
    "HIFKIR": "Hicham Zaki",
    "IEVATOD": "Eva Todd",
    "ITHAMAR": "Itamar Hirosh",
    "JARYCHK": "Jamila Rychlik",
    "JENNAKER": "Jenne Kerai",
    "JERRYAB": "Jerry Abouelnasr",
    "JESKO": "Jesse Kopavi",
    "JITHESHR": "Jithesh Raj",
    "JARNOLD": "John Arnold",
    "JOIBARR": "Jose Ibarra",
    "KAKKREH": "Kacey Krehbiel",
    "KANIKAKA": "Kanika Kapoor",
    "KBAGGKA": "Kanishka Bagga",
    "KARANR": "Karan Rustagi",
    "KAGRLK": "Karl Gregory",
    "KRODRIG": "Raul Rodriguez",
    "KARTHM": "Karthik Muthiah R",
    "KAPALAN": "Karuppiah Palaniappan",
    "KVONDER": "Kelsey von der Burg",
    "KRITTHAK": "Kriti Thakral",
    "LANCEWE": "Lance Westby",
    "LSHRIDHA": "Lavanya Shridhar",
    "LUIORT": "Luis Ortega Villalva",
    "LUKER": "Luke Ramsdale",
    "MAATHAN": "Maathangi Kannan Vaidehi",
    "MTHALLA": "Mahesh Babu Thalla",
    "MANUPA": "Manaswi Upadhyaya K",
    "MANCAND": "Manoj Chandran",
    "MANEGRR": "Marco Negrinho",
    "MVANPRA": "Martijn van Praag",
    "MASTREN": "Max Stein",
    "MMIKKELS": "Maygan Mikkelson",
    "MICHCU": "Michael Curtis",
    "MILINBD": "Milind Bhavsar",
    "MGULLED": "Mitchell Gulledge",
    "NATRIPAT": "Nandan Tripathi",
    "NSUHAS": "Nandeesh Swami",
    "NATANK": "Natan Kfir",
    "NATEEP": "Nate Pretikul",
    "NEILLOKE": "Neil O'Keeffe",
    "NIBINPM": "Nibin Mohanan",
    "NILJESS": "Niels Leijssenaar",
    "NIVABNTB": "Nitin Bamba",
    "OMARJAN": "Omar Janabi",
    "PARESHN": "Paresh Nathalal",
    "PAMOONE": "Paul Mooney",
    "PESANTO": "Pedro Santos",
    "PREMMUR": "Premkumar N",
    "PUDWIVE": "Pravej Dhivedi",
    "RCHISMAN": "Raheem Chisman",
    "REZXH": "Rex Zhao",
    "RMORIART": "Robert Moriarty",
    "ROBYNN": "Robyn Nolan",
    "ROTAVES": "Rodrigo Travessa",
    "RONMUST": "Ron Mustard",
    "PATELRUT": "Rutwik Patel",
    "CARTERRY": "Ryan Carter",
    "SALONIEV": "Salonie Vyas",
    "SAQIBZ": "Saqib Zulfiqar",
    "SATHIYS": "Sathiyanathan Subramaniam",
    "SVARTANI": "Serina Vartanian",
    "SKASERA": "Shalini Kasera",
    "SHERRYS": "Sherry Shao",
    "SOCHUBA": "Somi Ochuba",
    "SOPHYAN": "Sophia Yang",
    "CHATTERJ": "Soumodipto Chatterjee",
    "SAUSVIN": "Srivatsav Ausvin",
    "SKRYLOV": "Stas Krylov",
    "SDEINES": "Stefani Deines",
    "SANDRDES": "Steven Andress",
    "STEVENCO": "Steven Cooper",
    "SUBHASHA": "Subha Sahoo",
    "SUBUDHA": "Suraj Budhani",
    "TIMGRIFFITH": "Tim Griffin",
    "TIAHINTZ": "Tim Haintz",
    "THBLEDDS": "TJ Bledsoe",
    "TOMASSA": "Tomas Satala",
    "TONGONO": "Tony Gonzalez",
    "VIKONDA": "Vika Dohnin",
    "VCHANGAL": "Vimaldas Changarath",
    "VBRENNY": "Vinicius Brenny",
    "VISHNUT": "Vishnukumar T J",
    "YBAO": "Yunduan Bao",
    "ZESILVA": "Zélia Silva",
    "CPENCHO": "Chris Pencheon",
    "ANANJACH": "Janaja Chugh",
    "SRASHEEL": "Shadab Rasheed",
    "SIMIDOLT": "Simon Middleton",
    "MIKEAUD": "Aleks Lopez"
};

console.log(`Loaded ${Object.keys(aliasMap).length} aliases from local config`);

// ===========================
// Activity Log
// ===========================
function logActivity(action, userName, podTitle) {
    activityLogCollection.add({
        action,
        userName: userName || "Unknown",
        podTitle: podTitle || "Unknown",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.warn("Activity log write failed:", err));
}

function renderActivityLog(entries) {
    const list = document.getElementById("activityLogList");
    if (!list) return;

    if (entries.length === 0) {
        list.innerHTML = '<div class="activity-log-empty">No activity logged yet.</div>';
        return;
    }

    const icons = {
        proposed: "🚀",
        voted: "🗳️",
        revoked_vote: "↩️",
        joined: "➕",
        left: "👋",
        approved: "✅",
        rejected: "❌"
    };

    const descriptions = {
        proposed: "proposed",
        voted: "voted for",
        revoked_vote: "withdrew vote from",
        joined: "joined",
        left: "left",
        approved: "approved",
        rejected: "rejected"
    };

    list.innerHTML = entries.map(entry => {
        const ts = entry.timestamp?.toDate ? entry.timestamp.toDate() : new Date(entry.timestamp);
        const dateStr = ts.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const timeStr = ts.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        const icon = icons[entry.action] || "📌";
        const desc = descriptions[entry.action] || entry.action;

        return `<div class="activity-log-entry">
            <span class="activity-log-time">${dateStr} at ${timeStr}</span>
            <span class="activity-log-icon">${icon}</span>
            <span class="activity-log-user">${sanitize(entry.userName)}</span> ${desc}
            <span class="activity-log-pod">${sanitize(entry.podTitle)}</span>
        </div>`;
    }).join("");
}

// Real-time listener for activity log
activityLogCollection.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    const entries = [];
    snapshot.forEach(doc => entries.push(doc.data()));
    renderActivityLog(entries);
}, (err) => {
    console.warn("Activity log listener error:", err);
});

// ===========================
// DOM Elements
// ===========================
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

const createPodBtn = document.getElementById("createPodBtn");
const createModal = document.getElementById("createModal");
const closeCreateModal = document.getElementById("closeCreateModal");
const createPodForm = document.getElementById("createPodForm");

const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");
const successOkBtn = document.getElementById("successOkBtn");

const podDetailModal = document.getElementById("podDetailModal");
const closeDetailModal = document.getElementById("closeDetailModal");
const detailTitle = document.getElementById("detailTitle");
const detailBody = document.getElementById("detailBody");
const detailFooter = document.getElementById("detailFooter");

const joinModal = document.getElementById("joinModal");
const closeJoinModal = document.getElementById("closeJoinModal");
const joinNameInput = document.getElementById("joinName");
const joinSubmitBtn = document.getElementById("joinSubmitBtn");

const joinSuccessProposalModal = document.getElementById("joinSuccessProposalModal");
const closeJoinSuccessProposalModal = document.getElementById("closeJoinSuccessProposalModal");
const joinSuccessProposalOkBtn = document.getElementById("joinSuccessProposalOkBtn");

const joinSuccessActiveModal = document.getElementById("joinSuccessActiveModal");
const closeJoinSuccessActiveModal = document.getElementById("closeJoinSuccessActiveModal");
const joinSuccessActiveOkBtn = document.getElementById("joinSuccessActiveOkBtn");

const voteSuccessModal = document.getElementById("voteSuccessModal");
const closeVoteSuccessModal = document.getElementById("closeVoteSuccessModal");
const voteSuccessOkBtn = document.getElementById("voteSuccessOkBtn");
const votesRemaining = document.getElementById("votesRemaining");
const joinModalTitle = document.getElementById("joinModalTitle");

const dateTimeModal = document.getElementById("dateTimeModal");
const closeDateTimeModal = document.getElementById("closeDateTimeModal");
const dateTimeSubmitBtn = document.getElementById("dateTimeSubmitBtn");

const dashboardTiles = document.getElementById("dashboard-tiles");
const dashboardEmpty = document.getElementById("dashboard-empty");
const proposalsTiles = document.getElementById("proposals-tiles");
const proposalsEmpty = document.getElementById("proposals-empty");
const reviewTiles = document.getElementById("review-tiles");
const reviewEmpty = document.getElementById("review-empty");
const adminReviewNavLink = document.querySelectorAll('.nav-link-admin');

// ===========================
// State
// ===========================
let currentPodId = null;
let currentPodStatus = null; // "proposal" or "active"
let isAdmin = false;
let deletePodId = null;

// Alias lookup: maps uppercase alias -> full name
const aliasMap = {
    "AIGUPTA": "Aishwarya Gupta",
    "ALESLIU": "Alessandra Liu",
    "ALLENWE": "Allen Weiss",
    "AMANJHA": "Aman Jha",
    "AMANSAH": "Aman Sahni",
    "AMAMHE": "Ameer Ahmed",
    "AMUKUMA": "Amit Kumar",
    "AMITKUM": "Amit Kumar",
    "AMULYEA": "Amulya Eedara",
    "ANDYPUN": "Andy Puntacharat",
    "ANOLIVEI": "Angelo Oliveira",
    "ANKVARSH": "Ankit Varshney",
    "ANNANGI": "Anshul Nanjangi",
    "AALEJAND": "Antonio Alejandro",
    "ADURAISW": "Arunkumar Duraiswamy",
    "AUBEAUC": "Austin Beauchamp",
    "ABOACHI": "Bogdan Alexandru Achim",
    "CHASIG": "Chandan Kumar Singh",
    "CHRLEW": "Chris Lewis",
    "CHRICHAR": "Christian Chavez Castillo",
    "COLINF": "Colin Fritzke",
    "CORYPASA": "Cory Posada",
    "COUGUIM": "Cosmin Guliman",
    "CRISK": "Cristina Knecht",
    "CURTISLE": "Curtis Lewis",
    "DANIMAN": "Dan Manrique",
    "DAVIDEES": "David Vest",
    "DKOUZMA": "Doyko Kouzmanov",
    "ELEANOR": "Eleanor Falla",
    "FLKELLY": "Fletcher Kelly",
    "GMGCAFF": "Geordie (JOR-dee) McGarty",
    "GUMALLE": "Gustavo Mauler",
    "GOLIVEIRA": "Gustavo Oliveira",
    "HACHOW": "Hanisha Chowdary Sava",
    "HENASCHI": "Helder Nascimento",
    "HEVARY": "Hemanth Varyani",
    "HIFKIR": "Hicham Zaki",
    "IEVATOD": "Eva Todd",
    "ITHAMAR": "Itamar Hirosh",
    "JARYCHK": "Jamila Rychlik",
    "JENNAKER": "Jenne Kerai",
    "JERRYAB": "Jerry Abouelnasr",
    "JESKO": "Jesse Kopavi",
    "JITHESHR": "Jithesh Raj",
    "JARNOLD": "John Arnold",
    "JOIBARR": "Jose Ibarra",
    "KAKKREH": "Kacey Krehbiel",
    "KANIKAKA": "Kanika Kapoor",
    "KBAGGKA": "Kanishka Bagga",
    "KARANR": "Karan Rustagi",
    "KAGRLK": "Karl Gregory",
    "KRODRIG": "Raul Rodriguez",
    "KARTHM": "Karthik Muthiah R",
    "KAPALAN": "Karuppiah Palaniappan",
    "KVONDER": "Kelsey von der Burg",
    "KRITTHAK": "Kriti Thakral",
    "LANCEWE": "Lance Westby",
    "LSHRIDHA": "Lavanya Shridhar",
    "LUIORT": "Luis Ortega Villalva",
    "LUKER": "Luke Ramsdale",
    "MAATHAN": "Maathangi Kannan Vaidehi",
    "MTHALLA": "Mahesh Babu Thalla",
    "MANUPA": "Manaswi Upadhyaya K",
    "MANCAND": "Manoj Chandran",
    "MANEGRR": "Marco Negrinho",
    "MVANPRA": "Martijn van Praag",
    "MASTREN": "Max Stein",
    "MMIKKELS": "Maygan Mikkelson",
    "MICHCU": "Michael Curtis",
    "MILINBD": "Milind Bhavsar",
    "MGULLED": "Mitchell Gulledge",
    "NATRIPAT": "Nandan Tripathi",
    "NSUHAS": "Nandeesh Swami",
    "NATANK": "Natan Kfir",
    "NATEEP": "Nate Pretikul",
    "NEILLOKE": "Neil O'Keeffe",
    "NIBINPM": "Nibin Mohanan",
    "NILJESS": "Niels Leijssenaar",
    "NIVABNTB": "Nitin Bamba",
    "OMARJAN": "Omar Janabi",
    "PARESHN": "Paresh Nathalal",
    "PAMOONE": "Paul Mooney",
    "PESANTO": "Pedro Santos",
    "PREMMUR": "Premkumar N",
    "PUDWIVE": "Pravej Dhivedi",
    "RCHISMAN": "Raheem Chisman",
    "REZXH": "Rex Zhao",
    "RMORIART": "Robert Moriarty",
    "ROBYNN": "Robyn Nolan",
    "ROTAVES": "Rodrigo Travessa",
    "RONMUST": "Ron Mustard",
    "PATELRUT": "Rutwik Patel",
    "CARTERRY": "Ryan Carter",
    "SALONIEV": "Salonie Vyas",
    "SAQIBZ": "Saqib Zulfiqar",
    "SATHIYS": "Sathiyanathan Subramaniam",
    "SVARTANI": "Serina Vartanian",
    "SKASERA": "Shalini Kasera",
    "SHERRYS": "Sherry Shao",
    "SOCHUBA": "Somi Ochuba",
    "SOPHYAN": "Sophia Yang",
    "CHATTERJ": "Soumodipto Chatterjee",
    "SAUSVIN": "Srivatsav Ausvin",
    "SKRYLOV": "Stas Krylov",
    "SDEINES": "Stefani Deines",
    "SANDRDES": "Steven Andress",
    "STEVENCO": "Steven Cooper",
    "SUBHASHA": "Subha Sahoo",
    "SUBUDHA": "Suraj Budhani",
    "TIMGRIFFITH": "Tim Griffin",
    "TIAHINTZ": "Tim Haintz",
    "THBLEDDS": "TJ Bledsoe",
    "TOMASSA": "Tomas Satala",
    "TONGONO": "Tony Gonzalez",
    "VIKONDA": "Vika Dohnin",
    "VCHANGAL": "Vimaldas Changarath",
    "VBRENNY": "Vinicius Brenny",
    "VISHNUT": "Vishnukumar T J",
    "YBAO": "Yunduan Bao",
    "ZESILVA": "Zélia Silva",
    "CPENCHO": "Chris Pencheon",
    "ANANJACH": "Janaja Chugh",
    "SRASHEEL": "Shadab Rasheed",
    "SIMIDOLT": "Simon Middleton",
    "MIKEAUD": "Aleks Lopez"
};

console.log(`Loaded ${Object.keys(aliasMap).length} aliases from local config`);

// Validate alias (case-insensitive), returns full name or null
function resolveAlias(input) {
    const key = input.trim().toUpperCase();
    return aliasMap[key] || null;
}

// ===========================
// Pod Cache (for membership checks)
// ===========================
let cachedProposalPods = {};
let cachedActivePods = {};
let cachedPendingPods = {};

function getAllPods() {
    return { ...cachedPendingPods, ...cachedProposalPods, ...cachedActivePods };
}

function findUserPod(fullName) {
    const all = getAllPods();
    for (const [podId, data] of Object.entries(all)) {
        if (data.members && data.members.some(m => m.name === fullName)) {
            const member = data.members.find(m => m.name === fullName);
            return { podId, data, role: member.role };
        }
        if (data.votes && data.votes.some(v => v.name === fullName)) {
            return { podId, data, role: "Voter" };
        }
    }
    return null;
}

// Admin DOM elements
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLoginModal = document.getElementById("adminLoginModal");
const closeAdminLoginModal = document.getElementById("closeAdminLoginModal");
const adminPassword = document.getElementById("adminPassword");
const adminError = document.getElementById("adminError");
const adminLoginSubmitBtn = document.getElementById("adminLoginSubmitBtn");
const exitAdminBtn = document.getElementById("exitAdminBtn");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const closeDeleteConfirmModal = document.getElementById("closeDeleteConfirmModal");
const deleteCancelBtn = document.getElementById("deleteCancelBtn");
const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");
const clearAllPodsBtn = document.getElementById("clearAllPodsBtn");
const clearPodsConfirmModal = document.getElementById("clearPodsConfirmModal");
const closeClearPodsConfirmModal = document.getElementById("closeClearPodsConfirmModal");
const clearPodsCancelBtn = document.getElementById("clearPodsCancelBtn");
const clearPodsProceedBtn = document.getElementById("clearPodsProceedBtn");

// ===========================
// Navigation
// ===========================
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        // Block non-admins from admin-only pages
        if (targetPage === "adminreview" && !isAdmin) return;
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById("page-" + targetPage).classList.add("active");
        if (targetPage === "howitworks") resizeHowItWorksBoxes();
    });
});

function navigateTo(pageName) {
    navLinks.forEach(l => {
        l.classList.remove("active");
        if (l.dataset.page === pageName) l.classList.add("active");
    });
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + pageName).classList.add("active");
    if (pageName === "howitworks") resizeHowItWorksBoxes();
}

document.querySelectorAll(".desc-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

function resizeHowItWorksBoxes() {
    requestAnimationFrame(() => {
        const h = document.getElementById("howItWorksText");
        const p = document.getElementById("podIdeasText");
        if (h) { h.style.height = "auto"; h.style.height = Math.max(120, h.scrollHeight) + "px"; }
        if (p) { p.style.height = "auto"; p.style.height = Math.max(120, p.scrollHeight) + "px"; }
    });
}

// ===========================
// Modal Helpers
// ===========================
function openModal(modal) {
    modal.classList.add("open");
}

function closeModalFn(modal) {
    modal.classList.remove("open");
}

// Close modals when clicking overlay background
document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeModalFn(overlay);
        }
    });
});

// ===========================
// Create Pod
// ===========================
createPodBtn.addEventListener("click", () => {
    if (isSiteLocked()) {
        alert("The site is currently locked. Creating new pods is disabled.");
        return;
    }
    createPodForm.reset();
    openModal(createModal);
});

closeCreateModal.addEventListener("click", () => closeModalFn(createModal));

createPodForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const aliasInput = document.getElementById("organizerName").value.trim();
    const location = document.getElementById("location").value.trim();
    const activityTitle = document.getElementById("activityTitle").value.trim();
    const activityDescription = document.getElementById("activityDescription").value.trim();
    const moraleMoney = document.getElementById("moraleMoney").value.trim();
    const activityType = document.querySelector('input[name="activityType"]:checked')?.value;

    if (!aliasInput || !location || !activityTitle || !activityDescription || !moraleMoney || !activityType) {
        return;
    }

    const fullName = resolveAlias(aliasInput);
    if (!fullName) {
        alert("Invalid alias");
        return;
    }

    // Check if already in a pod
    const existingPod = findUserPod(fullName);
    if (existingPod) {
        if (existingPod.role === "Organizer" && (existingPod.data.status === "pending" || existingPod.data.status === "proposal")) {
            const statusLabel = existingPod.data.status === "pending" ? "pending admin review" : "awaiting votes";
            if (confirm(`You are the organizer of "${existingPod.data.activityTitle}" which is ${statusLabel}. Delete it to create a new pod?`)) {
                await podsCollection.doc(existingPod.podId).delete();
            } else {
                return;
            }
        } else {
            alert(`You are already in the pod "${existingPod.data.activityTitle}". You must leave that pod before creating a new one.`);
            return;
        }
    }

    const pod = {
        organizerName: fullName,
        location,
        activityTitle,
        activityDescription,
        moraleMoney,
        activityType,
        status: "pending",
        votes: [],
        members: [{ name: fullName, role: "Organizer", joinedAt: new Date().toISOString() }],
        dateTime: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await podsCollection.add(pod);
        logActivity("proposed", fullName, activityTitle);
        closeModalFn(createModal);
        openModal(successModal);
    } catch (err) {
        console.error("Failed to create pod:", err);
        alert("Something went wrong while creating your pod. Please try again.");
    }
});

// Success modal after creating pod
closeSuccessModal.addEventListener("click", () => closeModalFn(successModal));
successOkBtn.addEventListener("click", () => {
    closeModalFn(successModal);
    navigateTo("dashboard");
});

// ===========================
// Render Tiles
// ===========================
function sanitize(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// Pick a consistent random cat (0-3) based on document ID
function getCatIndex(docId) {
    let hash = 0;
    for (let i = 0; i < docId.length; i++) {
        hash = ((hash << 5) - hash) + docId.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % 4;
}

function renderProposalTile(doc) {
    const data = doc.data();
    const catIdx = getCatIndex(doc.id);
    const voteCount = data.votes ? data.votes.length : 0;
    const checks = Array.from({ length: 1 }, (_, i) =>
        `<span class="vote-check ${i < voteCount ? 'filled' : ''}">✓</span>`
    ).join("");
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `
        <button class="btn-tile-delete" data-id="${doc.id}" title="Delete pod">&times;</button>
        <div class="tile-avatar cat-${catIdx}"></div>
        <div class="tile-content">
            <div class="tile-title">${sanitize(data.activityTitle)}</div>
            <div class="tile-organizer">by ${sanitize(data.organizerName)}</div>
            <div class="tile-meta">
                <span class="tile-badge tile-type">${sanitize(data.activityType)}</span>
            </div>
            <div class="vote-checks">${checks}</div>
        </div>
    `;
    tile.querySelector(".btn-tile-delete").addEventListener("click", (e) => {
        e.stopPropagation();
        deletePodId = doc.id;
        openModal(deleteConfirmModal);
    });
    tile.addEventListener("click", () => openPodDetail(doc.id, data, "proposal"));
    return tile;
}

function renderActiveTile(doc) {
    const data = doc.data();
    const catIdx = getCatIndex(doc.id);
    const memberCount = data.members ? data.members.length : 0;
    const dateDisplay = data.dateTime ? sanitize(data.dateTime) : "Date: TBD";
    const isLocked = data.locked === true;
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `
        <button class="btn-tile-delete" data-id="${doc.id}" title="Delete pod">&times;</button>
        <div class="tile-avatar cat-${catIdx}"></div>
        <div class="tile-content">
            <div class="tile-title">${sanitize(data.activityTitle)}</div>
            <div class="tile-organizer">by ${sanitize(data.organizerName)}</div>
            <div class="tile-meta">
                <span class="tile-badge">👥 ${memberCount} member${memberCount !== 1 ? "s" : ""}</span>
                <span class="tile-badge">📅 ${dateDisplay}</span>
                <span class="tile-badge tile-type">${sanitize(data.activityType)}</span>
                ${isLocked ? '<span class="tile-badge tile-locked">🔒 Locked</span>' : ''}
            </div>
        </div>
    `;
    tile.querySelector(".btn-tile-delete").addEventListener("click", (e) => {
        e.stopPropagation();
        deletePodId = doc.id;
        openModal(deleteConfirmModal);
    });
    tile.addEventListener("click", () => openPodDetail(doc.id, data, "active"));
    return tile;
}

// ===========================
// Real-time Listeners
// ===========================
podsCollection
    .where("status", "==", "proposal")
    .onSnapshot((snapshot) => {
        // Auto-promote proposals that already have 1+ votes to active
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.votes && data.votes.length >= 1) {
                const newMembers = data.votes.map(v => ({
                    name: v.name,
                    role: "Member",
                    joinedAt: v.votedAt
                }));
                podsCollection.doc(doc.id).update({
                    status: "active",
                    members: firebase.firestore.FieldValue.arrayUnion(...newMembers)
                });
            }
        });

        // Update cache
        cachedProposalPods = {};
        snapshot.docs.forEach(doc => { cachedProposalPods[doc.id] = doc.data(); });

        // Clear tiles but keep empty state element
        proposalsTiles.querySelectorAll(".tile").forEach(t => t.remove());

        if (snapshot.empty) {
            proposalsEmpty.style.display = "block";
        } else {
            proposalsEmpty.style.display = "none";
            // Sort newest first client-side
            const docs = snapshot.docs.sort((a, b) => {
                const aTime = a.data().createdAt?.toMillis() || 0;
                const bTime = b.data().createdAt?.toMillis() || 0;
                return bTime - aTime;
            });
            docs.forEach((doc) => {
                proposalsTiles.appendChild(renderProposalTile(doc));
            });
        }
    });

podsCollection
    .where("status", "==", "active")
    .onSnapshot((snapshot) => {
        // Update cache
        cachedActivePods = {};
        snapshot.docs.forEach(doc => { cachedActivePods[doc.id] = doc.data(); });

        dashboardTiles.querySelectorAll(".tile").forEach(t => t.remove());

        if (snapshot.empty) {
            dashboardEmpty.style.display = "block";
        } else {
            dashboardEmpty.style.display = "none";
            // Sort newest first client-side
            const docs = snapshot.docs.sort((a, b) => {
                const aTime = a.data().createdAt?.toMillis() || 0;
                const bTime = b.data().createdAt?.toMillis() || 0;
                return bTime - aTime;
            });
            docs.forEach((doc) => {
                dashboardTiles.appendChild(renderActiveTile(doc));
            });
        }

    });

// ===========================
// Pod Detail View
// ===========================
function openPodDetail(podId, data, status) {
    currentPodId = podId;
    currentPodStatus = status;

    detailTitle.textContent = data.activityTitle;

    let votersHTML = "";
    if (status === "proposal") {
        const voterNames = data.votes && data.votes.length > 0
            ? data.votes.map(v => `<li>${sanitize(v.name)}</li>`).join("")
            : "<li>No votes yet</li>";
        votersHTML = `
            <div class="detail-section">
                <div class="detail-label">Votes (${data.votes ? data.votes.length : 0}/2)</div>
                <ul class="member-list">${voterNames}</ul>
            </div>
        `;
    }

    let membersHTML = "";
    if ((status === "active" || status === "past") && data.members && data.members.length > 0) {
        membersHTML = `
            <div class="detail-section">
                <div class="detail-label">Pod Members</div>
                <ul class="member-list">
                    ${data.members.map(m =>
                        `<li>${sanitize(m.name)} ${m.role === "Organizer" ? '<span class="member-badge">Organizer</span>' : ""}</li>`
                    ).join("")}
                </ul>
            </div>
        `;
    }

    let dateSection = "";
    if (status === "active" || status === "past") {
        const dateDisplay = data.dateTime || "TBD";
        dateSection = `
            <div class="detail-section">
                <div class="detail-label">Date & Time of Activity</div>
                <div class="detail-value">${sanitize(dateDisplay)}</div>
                ${status === "active" ? '<button class="btn-date" id="setDateBtn">Set / Update Date & Time</button>' : ''}
            </div>
        `;
    }

    const isLocked = data.locked === true;
    let lockedBanner = "";
    if (isLocked || status === "past") {
        lockedBanner = `<div class="pod-locked-banner">🔒 Pod is at max capacity!</div>`;
    }

    detailBody.innerHTML = `
        <div class="detail-section">
            <div class="detail-label">Organizer</div>
            <div class="detail-value">${sanitize(data.organizerName)}</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Location</div>
            <div class="detail-value">${sanitize(data.location)}</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Activity Type</div>
            <div class="detail-value">${sanitize(data.activityType)}</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Description</div>
            <div class="detail-value">${sanitize(data.activityDescription)}</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Morale Money</div>
            <div class="detail-value">${sanitize(data.moraleMoney || '')}</div>
        </div>
        ${dateSection}
        ${votersHTML}
        ${membersHTML}
        ${lockedBanner}
    `;

    // Build footer based on locked/status/admin
    let footerHTML = `<button class="btn-exit" id="detailExitBtn">Exit</button>`;

    if (!isLocked && status !== "past") {
        footerHTML += `<button class="btn-leave" id="detailLeaveBtn">${status === "proposal" ? "Withdraw Vote" : "Leave Pod"}</button>`;
        footerHTML += `<button class="btn-join" id="detailJoinBtn">${status === "proposal" ? "Vote" : "Join"}</button>`;
    }

    // Admin buttons
    if (isAdmin) {
        if (status === "proposal") {
            footerHTML += `<button class="btn-admin-action" id="adminActivateBtn">⚡ Activate</button>`;
        }
        if (status === "active") {
            footerHTML += `<button class="btn-admin-action" id="adminLockBtn">${isLocked ? "🔓 Unlock" : "🔒 Lock"}</button>`;
            footerHTML += `<button class="btn-admin-action" id="adminMarkPastBtn">📁 Mark as Past</button>`;
        }
        if (status === "past") {
            footerHTML += `<button class="btn-admin-action" id="adminReactivateBtn">🔄 Reactivate</button>`;
        }
        footerHTML += `<button class="btn-admin-action" id="adminEditBtn">✏️ Edit</button>`;
    }

    detailFooter.innerHTML = footerHTML;

    // Wire up footer buttons
    document.getElementById("detailExitBtn").addEventListener("click", () => {
        closeModalFn(podDetailModal);
    });

    const leaveBtn = document.getElementById("detailLeaveBtn");
    if (leaveBtn) {
        leaveBtn.addEventListener("click", () => {
            closeModalFn(podDetailModal);
            const leaveNameInput = document.getElementById("leaveName");
            leaveNameInput.value = "";
            const leaveModalTitle = document.getElementById("leaveModalTitle");
            leaveModalTitle.textContent = status === "proposal" ? "Withdraw Vote" : "Leave Pod";
            const leaveSubmitBtn = document.getElementById("leaveSubmitBtn");
            leaveSubmitBtn.textContent = status === "proposal" ? "Withdraw" : "Leave";
            openModal(document.getElementById("leaveModal"));
        });
    }

    const joinBtn = document.getElementById("detailJoinBtn");
    if (joinBtn) {
        joinBtn.addEventListener("click", () => {
            closeModalFn(podDetailModal);
            joinNameInput.value = "";
            if (status === "proposal") {
                joinModalTitle.textContent = "Vote for this Pod";
                joinSubmitBtn.textContent = "Vote";
            } else {
                joinModalTitle.textContent = "Join this Pod";
                joinSubmitBtn.textContent = "Join";
            }
            openModal(joinModal);
        });
    }

    // Admin: Activate proposal immediately
    const activateBtn = document.getElementById("adminActivateBtn");
    if (activateBtn) {
        activateBtn.addEventListener("click", async () => {
            const podRef = podsCollection.doc(podId);
            const voters = data.votes || [];
            const newMembers = voters.map(v => ({ name: v.name, role: "Member", joinedAt: v.votedAt }));
            await podRef.update({
                status: "active",
                members: firebase.firestore.FieldValue.arrayUnion(...(newMembers.length > 0 ? newMembers : []))
            });
            logActivity("approved", "Admin", data.activityTitle);
            closeModalFn(podDetailModal);
        });
    }

    // Admin: Lock/Unlock pod
    const lockBtn = document.getElementById("adminLockBtn");
    if (lockBtn) {
        lockBtn.addEventListener("click", async () => {
            await podsCollection.doc(podId).update({ locked: !isLocked });
            closeModalFn(podDetailModal);
        });
    }

    // Admin: Mark as past
    const markPastBtn = document.getElementById("adminMarkPastBtn");
    if (markPastBtn) {
        markPastBtn.addEventListener("click", async () => {
            await podsCollection.doc(podId).update({ status: "past", locked: true });
            closeModalFn(podDetailModal);
        });
    }

    // Admin: Reactivate past pod
    const reactivateBtn = document.getElementById("adminReactivateBtn");
    if (reactivateBtn) {
        reactivateBtn.addEventListener("click", async () => {
            await podsCollection.doc(podId).update({ status: "active", locked: false, reactivated: true });
            closeModalFn(podDetailModal);
        });
    }

    // Admin: Edit pod
    const editBtn = document.getElementById("adminEditBtn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            closeModalFn(podDetailModal);
            openEditPodModal(podId, data);
        });
    }

    // Wire up date button if active
    if (status === "active") {
        const setDateBtn = document.getElementById("setDateBtn");
        if (setDateBtn) {
            setDateBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                closeModalFn(podDetailModal);
                openModal(dateTimeModal);
            });
        }
    }

    openModal(podDetailModal);
}

closeDetailModal.addEventListener("click", () => closeModalFn(podDetailModal));

// ===========================
// Join Pod
// ===========================
closeJoinModal.addEventListener("click", () => closeModalFn(joinModal));

joinSubmitBtn.addEventListener("click", async () => {
    if (isSiteLocked()) {
        alert("The site is currently locked. Joining pods and voting is disabled.");
        closeModalFn(joinModal);
        return;
    }

    const aliasInput = joinNameInput.value.trim();
    if (!aliasInput) return;

    const fullName = resolveAlias(aliasInput);
    if (!fullName) {
        alert("Invalid alias");
        return;
    }

    // Check if already in a pod
    const existingPod = findUserPod(fullName);
    if (existingPod) {
        if (existingPod.podId === currentPodId) {
            alert("You are already in this pod.");
            return;
        } else if (existingPod.role === "Organizer" && (existingPod.data.status === "pending" || existingPod.data.status === "proposal")) {
            // Organizer of a pending/proposal pod can delete it to join another
            const statusLabel = existingPod.data.status === "pending" ? "pending admin review" : "awaiting votes";
            if (confirm(`You are the organizer of "${existingPod.data.activityTitle}" which is ${statusLabel}. Delete it to proceed?`)) {
                await podsCollection.doc(existingPod.podId).delete();
            } else {
                return;
            }
        } else if (existingPod.role === "Voter") {
            alert(`You already voted for the pod "${existingPod.data.activityTitle}". You must withdraw your vote from that pod before voting for or joining another.`);
            return;
        } else {
            alert(`You are already in the pod "${existingPod.data.activityTitle}". You must leave that pod before joining another.`);
            return;
        }
    }

    const podRef = podsCollection.doc(currentPodId);

    // Check if pod is locked
    const checkSnap = await podRef.get();
    if (checkSnap.exists && checkSnap.data().locked === true) {
        alert("This pod is locked and not accepting new members.");
        closeModalFn(joinModal);
        return;
    }

    if (currentPodStatus === "proposal") {
        // Add vote to proposal
        const podSnap = await podRef.get();
        const podData = podSnap.data();
        const currentVotes = podData.votes || [];
        const newVotes = [...currentVotes, { name: fullName, votedAt: new Date().toISOString() }];

        if (newVotes.length >= 1) {
            // 1 vote reached — activate the pod and add all voters as members
            const newMembers = newVotes.map(v => ({
                name: v.name,
                role: "Member",
                joinedAt: v.votedAt
            }));
            await podRef.update({
                status: "active",
                votes: newVotes,
                members: firebase.firestore.FieldValue.arrayUnion(...newMembers)
            });
            logActivity("voted", fullName, podData.activityTitle);
            closeModalFn(joinModal);
            openModal(joinSuccessProposalModal);
        } else {
            // Vote counted but not enough yet
            await podRef.update({
                votes: newVotes
            });
            logActivity("voted", fullName, podData.activityTitle);
            votesRemaining.textContent = (1 - newVotes.length);
            closeModalFn(joinModal);
            openModal(voteSuccessModal);
        }
    } else {
        // Already active — just add member
        await podRef.update({
            members: firebase.firestore.FieldValue.arrayUnion({
                name: fullName,
                role: "Member",
                joinedAt: new Date().toISOString()
            })
        });
        const joinedPodSnap = await podRef.get();
        logActivity("joined", fullName, joinedPodSnap.data().activityTitle);
        closeModalFn(joinModal);
        openModal(joinSuccessActiveModal);
    }
});

// Join success (proposal -> launched)
closeJoinSuccessProposalModal.addEventListener("click", () => {
    closeModalFn(joinSuccessProposalModal);
    navigateTo("dashboard");
});
joinSuccessProposalOkBtn.addEventListener("click", () => {
    closeModalFn(joinSuccessProposalModal);
    navigateTo("dashboard");
});

// Vote success (vote counted, not yet active)
closeVoteSuccessModal.addEventListener("click", () => closeModalFn(voteSuccessModal));
voteSuccessOkBtn.addEventListener("click", () => closeModalFn(voteSuccessModal));

// Join success (active -> joined)
closeJoinSuccessActiveModal.addEventListener("click", () => {
    closeModalFn(joinSuccessActiveModal);
    navigateTo("dashboard");
});
joinSuccessActiveOkBtn.addEventListener("click", () => {
    closeModalFn(joinSuccessActiveModal);
    navigateTo("dashboard");
});

// ===========================
// Set Date & Time
// ===========================
closeDateTimeModal.addEventListener("click", () => closeModalFn(dateTimeModal));

dateTimeSubmitBtn.addEventListener("click", async () => {
    const date = document.getElementById("activityDate").value;
    const time = document.getElementById("activityTime").value;
    const timezone = document.getElementById("activityTimezone").value;

    if (!date || !time) return;

    // Format: "Mar 25, 2026 at 3:00 PM EST"
    const dateObj = new Date(date + "T" + time);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    // Format time to 12-hour
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const dateTimeString = `${formattedDate} at ${formattedTime} ${timezone}`;

    await podsCollection.doc(currentPodId).update({
        dateTime: dateTimeString
    });

    closeModalFn(dateTimeModal);
});

// ===========================
// Edit Pod (Admin)
// ===========================
const editPodModal = document.getElementById("editPodModal");
const closeEditPodModal = document.getElementById("closeEditPodModal");
const editPodForm = document.getElementById("editPodForm");
let editingPodId = null;

closeEditPodModal.addEventListener("click", () => closeModalFn(editPodModal));

function openEditPodModal(podId, data) {
    editingPodId = podId;
    document.getElementById("editPodTitle").value = data.activityTitle || "";
    document.getElementById("editPodLocation").value = data.location || "";
    document.getElementById("editPodDescription").value = data.activityDescription || "";
    document.getElementById("editPodMoraleMoney").value = data.moraleMoney || "";
    document.getElementById("editPodType").value = data.activityType || "In-Person";
    document.getElementById("editPodDate").value = data.dateTime || "";
    openModal(editPodModal);
}

editPodForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!editingPodId) return;
    await podsCollection.doc(editingPodId).update({
        activityTitle: document.getElementById("editPodTitle").value.trim(),
        location: document.getElementById("editPodLocation").value.trim(),
        activityDescription: document.getElementById("editPodDescription").value.trim(),
        moraleMoney: document.getElementById("editPodMoraleMoney").value.trim(),
        activityType: document.getElementById("editPodType").value,
        dateTime: document.getElementById("editPodDate").value.trim() || null
    });
    editingPodId = null;
    closeModalFn(editPodModal);
});

// ===========================
// Past Pods (auto-move + render)
// ===========================
let cachedPastPods = {};
const pastPodsTiles = document.getElementById("past-pods-tiles");
const pastPodsEmpty = document.getElementById("past-pods-empty");

// Check active pods for past dates and auto-move them (runs once on page load)
function checkAndMovePastPods() {
    const now = new Date();
    Object.entries(cachedActivePods).forEach(([podId, data]) => {
        // Skip pods that were explicitly reactivated by an admin
        if (data.reactivated) return;
        if (data.dateTime && data.dateTime !== "TBD") {
            // Parse date like "May 10, 2026 at 3:00 PM EST"
            const dateStr = data.dateTime.replace(/ at /, " ").replace(/ (EST|CST|MST|PST|AST|HST|UTC|GMT|CET|IST|JST|AEST)$/, "");
            const podDate = new Date(dateStr);
            if (!isNaN(podDate.getTime()) && podDate < now) {
                podsCollection.doc(podId).update({ status: "past", locked: true });
            }
        }
    });
}

// Run once after initial data loads
setTimeout(() => checkAndMovePastPods(), 3000);

// Run on each active pods snapshot
function renderPastTile(doc) {
    const data = doc.data();
    const catIdx = getCatIndex(doc.id);
    const memberCount = data.members ? data.members.length : 0;
    const dateDisplay = data.dateTime ? sanitize(data.dateTime) : "Date: TBD";
    const tile = document.createElement("div");
    tile.className = "tile tile-past";
    tile.innerHTML = `
        <button class="btn-tile-delete" data-id="${doc.id}" title="Delete pod">&times;</button>
        <div class="tile-avatar cat-${catIdx}"></div>
        <div class="tile-content">
            <div class="tile-title">${sanitize(data.activityTitle)}</div>
            <div class="tile-organizer">by ${sanitize(data.organizerName)}</div>
            <div class="tile-meta">
                <span class="tile-badge">👥 ${memberCount} member${memberCount !== 1 ? "s" : ""}</span>
                <span class="tile-badge">📅 ${dateDisplay}</span>
                <span class="tile-badge tile-type">${sanitize(data.activityType)}</span>
                <span class="tile-badge tile-locked">🔒 Completed</span>
            </div>
        </div>
    `;
    tile.querySelector(".btn-tile-delete").addEventListener("click", (e) => {
        e.stopPropagation();
        deletePodId = doc.id;
        openModal(deleteConfirmModal);
    });
    tile.addEventListener("click", () => openPodDetail(doc.id, data, "past"));
    return tile;
}

podsCollection
    .where("status", "==", "past")
    .onSnapshot((snapshot) => {
        cachedPastPods = {};
        snapshot.docs.forEach(doc => { cachedPastPods[doc.id] = doc.data(); });

        pastPodsTiles.querySelectorAll(".tile").forEach(t => t.remove());

        if (snapshot.empty) {
            pastPodsEmpty.style.display = "block";
        } else {
            pastPodsEmpty.style.display = "none";
            const docs = snapshot.docs.sort((a, b) => {
                const aTime = a.data().createdAt?.toMillis() || 0;
                const bTime = b.data().createdAt?.toMillis() || 0;
                return bTime - aTime;
            });
            docs.forEach((doc) => {
                pastPodsTiles.appendChild(renderPastTile(doc));
            });
        }
    });

// ===========================
// Admin Login / Logout
// ===========================
adminLoginBtn.addEventListener("click", () => {
    if (isAdmin) {
        exitAdmin();
    } else {
        adminPassword.value = "";
        adminError.style.display = "none";
        openModal(adminLoginModal);
    }
});

closeAdminLoginModal.addEventListener("click", () => closeModalFn(adminLoginModal));

adminLoginSubmitBtn.addEventListener("click", () => {
    const pw = adminPassword.value;
    if (pw === "aalejandro") {
        isAdmin = true;
        document.body.classList.add("admin-mode");
        exitAdminBtn.style.display = "block";
        adminLoginBtn.textContent = "Admin \u2713";
        adminReviewNavLink.forEach(el => el.style.display = "inline-block");
        enableAdminTextBoxes();
        updateSiteLockUI();
        closeModalFn(adminLoginModal);
    } else {
        adminError.style.display = "block";
    }
});

// Allow Enter key to submit admin password
adminPassword.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        adminLoginSubmitBtn.click();
    }
});

function exitAdmin() {
    isAdmin = false;
    document.body.classList.remove("admin-mode");
    exitAdminBtn.style.display = "none";
    adminLoginBtn.textContent = "Admin Log In";
    adminReviewNavLink.forEach(el => el.style.display = "none");
    // If on admin-only page, navigate away
    if (document.getElementById("page-adminreview").classList.contains("active") ||
        document.getElementById("page-reporting").classList.contains("active")) {
        navigateTo("dashboard");
    }
    disableAdminTextBoxes();
    updateSiteLockUI();
}

exitAdminBtn.addEventListener("click", exitAdmin);

// ===========================
// Delete Pod (Admin)
// ===========================
closeDeleteConfirmModal.addEventListener("click", () => {
    deletePodId = null;
    closeModalFn(deleteConfirmModal);
});

deleteCancelBtn.addEventListener("click", () => {
    deletePodId = null;
    closeModalFn(deleteConfirmModal);
});

deleteConfirmBtn.addEventListener("click", async () => {
    if (!deletePodId) return;
    await podsCollection.doc(deletePodId).delete();
    deletePodId = null;
    closeModalFn(deleteConfirmModal);
});

clearAllPodsBtn.addEventListener("click", () => {
    if (!isAdmin) return;
    openModal(clearPodsConfirmModal);
});

closeClearPodsConfirmModal.addEventListener("click", () => closeModalFn(clearPodsConfirmModal));
clearPodsCancelBtn.addEventListener("click", () => closeModalFn(clearPodsConfirmModal));

clearPodsProceedBtn.addEventListener("click", async () => {
    if (!isAdmin) return;
    const snapshot = await podsCollection.get();
    const batch = db.batch();
    snapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    closeModalFn(clearPodsConfirmModal);
    logActivity("rejected", "Admin", "All pods cleared");
});

// ===========================
// Admin Text Boxes (How It Works page)
// ===========================
const howItWorksText = document.getElementById("howItWorksText");
const podIdeasText = document.getElementById("podIdeasText");
const saveHowItWorks = document.getElementById("saveHowItWorks");
const savePodIdeas = document.getElementById("savePodIdeas");
const settingsDoc = db.collection("settings").doc("howItWorks");

// Load content from Firestore
settingsDoc.onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        if (data.howItWorks != null) howItWorksText.value = data.howItWorks;
        if (data.podIdeas != null) podIdeasText.value = data.podIdeas;
    }
    autoResizeTextBox(howItWorksText);
    autoResizeTextBox(podIdeasText);
});

// Auto-resize textareas to fit content
function autoResizeTextBox(el) {
    // Only resize if element is visible (non-zero offsetParent)
    if (!el.offsetParent) return;
    el.style.height = "auto";
    el.style.height = Math.max(120, el.scrollHeight) + "px";
}

howItWorksText.addEventListener("input", () => autoResizeTextBox(howItWorksText));
podIdeasText.addEventListener("input", () => autoResizeTextBox(podIdeasText));

function enableAdminTextBoxes() {
    howItWorksText.removeAttribute("readonly");
    podIdeasText.removeAttribute("readonly");
    saveHowItWorks.style.display = "block";
    savePodIdeas.style.display = "block";
}

function disableAdminTextBoxes() {
    howItWorksText.setAttribute("readonly", true);
    podIdeasText.setAttribute("readonly", true);
    saveHowItWorks.style.display = "none";
    savePodIdeas.style.display = "none";
}

saveHowItWorks.addEventListener("click", async () => {
    await settingsDoc.set({ howItWorks: howItWorksText.value }, { merge: true });
});

savePodIdeas.addEventListener("click", async () => {
    await settingsDoc.set({ podIdeas: podIdeasText.value }, { merge: true });
});

// ===========================
// Admin Review Page (Pending Pods)
// ===========================
function renderReviewTile(doc) {
    const data = doc.data();
    const catIdx = getCatIndex(doc.id);
    const tile = document.createElement("div");
    tile.className = "tile review-tile";
    tile.innerHTML = `
        <div class="tile-avatar cat-${catIdx}"></div>
        <div class="tile-content">
            <div class="tile-title">${sanitize(data.activityTitle)}</div>
            <div class="tile-organizer">by ${sanitize(data.organizerName)}</div>
            <div class="detail-section" style="margin-top:8px;">
                <div class="detail-label">Location</div>
                <div class="detail-value">${sanitize(data.location)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Type</div>
                <div class="detail-value">${sanitize(data.activityType)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Description</div>
                <div class="detail-value">${sanitize(data.activityDescription)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Morale Money</div>
                <div class="detail-value">${sanitize(data.moraleMoney || '')}</div>
            </div>
            <div class="review-actions">
                <button class="btn-approve" data-id="${doc.id}">Approve</button>
                <button class="btn-reject" data-id="${doc.id}">Reject</button>
            </div>
        </div>
    `;
    tile.querySelector(".btn-approve").addEventListener("click", async (e) => {
        e.stopPropagation();
        await podsCollection.doc(doc.id).update({ status: "proposal" });
        logActivity("approved", "Admin", data.activityTitle);
    });
    tile.querySelector(".btn-reject").addEventListener("click", async (e) => {
        e.stopPropagation();
        if (confirm("Reject this pod? It will be marked as rejected.")) {
            await podsCollection.doc(doc.id).update({
                status: "rejected",
                rejectedAt: new Date().toISOString()
            });
            logActivity("rejected", "Admin", data.activityTitle);
        }
    });
    return tile;
}

podsCollection
    .where("status", "==", "pending")
    .onSnapshot((snapshot) => {
        // Update cache
        cachedPendingPods = {};
        snapshot.docs.forEach(doc => { cachedPendingPods[doc.id] = doc.data(); });

        reviewTiles.querySelectorAll(".tile").forEach(t => t.remove());

        if (snapshot.empty) {
            reviewEmpty.style.display = "block";
        } else {
            reviewEmpty.style.display = "none";
            const docs = snapshot.docs.sort((a, b) => {
                const aTime = a.data().createdAt?.toMillis() || 0;
                const bTime = b.data().createdAt?.toMillis() || 0;
                return bTime - aTime;
            });
            docs.forEach((doc) => {
                reviewTiles.appendChild(renderReviewTile(doc));
            });
        }
    });

// ===========================
// Leave / Withdraw from Pod
// ===========================
const leaveModal = document.getElementById("leaveModal");
const closeLeaveModal = document.getElementById("closeLeaveModal");

closeLeaveModal.addEventListener("click", () => closeModalFn(leaveModal));

document.getElementById("leaveSubmitBtn").addEventListener("click", async () => {
    const aliasInput = document.getElementById("leaveName").value.trim();
    if (!aliasInput) return;

    const fullName = resolveAlias(aliasInput);
    if (!fullName) {
        alert("Invalid alias");
        return;
    }

    const podRef = podsCollection.doc(currentPodId);
    const podSnap = await podRef.get();
    if (!podSnap.exists) {
        alert("This pod no longer exists.");
        closeModalFn(leaveModal);
        return;
    }
    const podData = podSnap.data();

    // Check if organizer — organizer deletes the pod
    const isOrganizer = podData.members && podData.members.some(m => m.name === fullName && m.role === "Organizer");
    if (isOrganizer) {
        if (confirm("As the organizer, this will delete the entire pod. Are you sure?")) {
            await podRef.delete();
            closeModalFn(leaveModal);
            alert("Your pod has been deleted.");
        }
        return;
    }

    // Check if member of active pod
    if (podData.status === "active") {
        const memberEntry = podData.members && podData.members.find(m => m.name === fullName);
        if (memberEntry) {
            const updateData = {
                members: firebase.firestore.FieldValue.arrayRemove(memberEntry)
            };
            // Also remove from votes array if they voted during proposal phase
            const voteEntry = podData.votes && podData.votes.find(v => v.name === fullName);
            if (voteEntry) {
                updateData.votes = firebase.firestore.FieldValue.arrayRemove(voteEntry);
            }
            await podRef.update(updateData);
            logActivity("left", fullName, podData.activityTitle);
            closeModalFn(leaveModal);
            alert("You have left this pod.");
            return;
        }
    }

    // Check if voter on proposal
    if (podData.status === "proposal") {
        const voteEntry = podData.votes && podData.votes.find(v => v.name === fullName);
        if (voteEntry) {
            await podRef.update({
                votes: firebase.firestore.FieldValue.arrayRemove(voteEntry)
            });
            logActivity("revoked_vote", fullName, podData.activityTitle);
            closeModalFn(leaveModal);
            alert("Your vote has been withdrawn.");
            return;
        }
    }

    alert("You are not part of this pod.");
});

// ===========================
// Rejected Pods Cache
// ===========================
let cachedRejectedPods = {};

podsCollection
    .where("status", "==", "rejected")
    .onSnapshot((snapshot) => {
        cachedRejectedPods = {};
        snapshot.docs.forEach(doc => { cachedRejectedPods[doc.id] = doc.data(); });
        updateReporting();
    });

// Also trigger reporting updates from other listeners
// (We call updateReporting at the end of each existing listener via a rewrite
//  — instead we just call it on a slight delay to catch all snapshot updates)

// ===========================
// Reporting Dashboard
// ===========================
const reportTimeFilter = document.getElementById("reportTimeFilter");
if (reportTimeFilter) {
    reportTimeFilter.addEventListener("change", () => updateReporting());
}

function getFilteredPods(podsObj, daysBack) {
    if (daysBack === "all") return Object.entries(podsObj);
    const cutoff = Date.now() - (parseInt(daysBack) * 24 * 60 * 60 * 1000);
    return Object.entries(podsObj).filter(([_, data]) => {
        const created = data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt ? new Date(data.createdAt).getTime() : 0);
        return created >= cutoff;
    });
}

function updateReporting() {
    const filter = reportTimeFilter ? reportTimeFilter.value : "all";

    const activePods = getFilteredPods(cachedActivePods, filter);
    const proposalPods = getFilteredPods(cachedProposalPods, filter);
    const pendingPods = getFilteredPods(cachedPendingPods, filter);
    const rejectedPods = getFilteredPods(cachedRejectedPods, filter);

    // --- Stat cards ---
    const el = (id) => document.getElementById(id);
    if (!el("statActivePods")) return; // page not in DOM

    el("statActivePods").textContent = activePods.length;
    el("statProposedPods").textContent = proposalPods.length;
    el("statPendingPods").textContent = pendingPods.length;
    el("statRejectedPods").textContent = rejectedPods.length;

    // Total unique participants across active pods
    const allParticipants = new Set();
    let totalMembersInActive = 0;
    activePods.forEach(([_, data]) => {
        if (data.members) {
            data.members.forEach(m => allParticipants.add(m.name));
            totalMembersInActive += data.members.length;
        }
    });
    // Also count voters in proposals
    proposalPods.forEach(([_, data]) => {
        if (data.votes) data.votes.forEach(v => allParticipants.add(v.name));
    });

    el("statTotalParticipants").textContent = allParticipants.size;
    el("statAvgMembers").textContent = activePods.length > 0
        ? (totalMembersInActive / activePods.length).toFixed(1)
        : "0";

    // --- Members per active pod table ---
    const membersPerPodEl = el("reportMembersPerPod");
    if (activePods.length === 0) {
        membersPerPodEl.innerHTML = '<p class="report-empty">No active pods in this period.</p>';
    } else {
        const rows = activePods
            .sort((a, b) => (b[1].members?.length || 0) - (a[1].members?.length || 0))
            .map(([_, data]) => `<tr><td>${sanitize(data.activityTitle)}</td><td>${data.members ? data.members.length : 0}</td></tr>`)
            .join("");
        membersPerPodEl.innerHTML = `<table class="report-table"><thead><tr><th>Pod</th><th>Members</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // --- Activity type breakdown ---
    const allPods = [...activePods, ...proposalPods, ...pendingPods, ...rejectedPods];
    const typeCounts = {};
    allPods.forEach(([_, data]) => {
        const t = data.activityType || "Unknown";
        typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
    const typeEl = el("reportTypeBreakdown");
    if (allPods.length === 0) {
        typeEl.innerHTML = '<p class="report-empty">No data available.</p>';
    } else {
        const typeRows = Object.entries(typeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => {
                const pct = ((count / allPods.length) * 100).toFixed(0);
                return `<tr><td>${sanitize(type)}</td><td>${count}</td><td>${pct}%</td></tr>`;
            })
            .join("");
        typeEl.innerHTML = `<table class="report-table"><thead><tr><th>Type</th><th>Count</th><th>%</th></tr></thead><tbody>${typeRows}</tbody></table>`;
    }

    // --- Popular keywords ---
    const stopWords = new Set(["the","a","an","and","or","of","to","in","for","at","on","is","it","we","our","this","that","with","by","as","be","are","was","do","from","my"]);
    const wordCounts = {};
    allPods.forEach(([_, data]) => {
        const text = (data.activityTitle || "").toLowerCase();
        text.split(/\W+/).forEach(word => {
            if (word.length > 2 && !stopWords.has(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
    });
    const keywordsEl = el("reportKeywords");
    const topKeywords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);
    if (topKeywords.length === 0) {
        keywordsEl.innerHTML = '<p class="report-empty">No data available.</p>';
    } else {
        keywordsEl.innerHTML = topKeywords
            .map(([word, count]) => `<span class="report-keyword">${sanitize(word)} <strong>(${count})</strong></span>`)
            .join("");
    }

    // --- Rules-based summary ---
    generateSummary(activePods, proposalPods, pendingPods, rejectedPods, typeCounts, topKeywords, allParticipants.size);

    // --- Team Participation ---
    updateParticipationPanel(activePods, proposalPods, pendingPods);
}

function generateSummary(activePods, proposalPods, pendingPods, rejectedPods, typeCounts, topKeywords, uniqueParticipants) {
    const summaryEl = document.getElementById("reportSummary");
    if (!summaryEl) return;

    const total = activePods.length + proposalPods.length + pendingPods.length + rejectedPods.length;
    if (total === 0) {
        summaryEl.textContent = "No pod data available yet.";
        return;
    }

    const parts = [];

    // Overall activity
    parts.push(`There ${total === 1 ? "has been" : "have been"} <strong>${total}</strong> pod${total !== 1 ? "s" : ""} created in total, with <strong>${activePods.length}</strong> currently active, <strong>${proposalPods.length}</strong> in the proposal stage, <strong>${pendingPods.length}</strong> pending review, and <strong>${rejectedPods.length}</strong> rejected.`);

    // Participation
    if (uniqueParticipants > 0) {
        parts.push(`A total of <strong>${uniqueParticipants}</strong> unique team member${uniqueParticipants !== 1 ? "s" : ""} ${uniqueParticipants !== 1 ? "have" : "has"} participated across all pods.`);
    }

    // Average members
    if (activePods.length > 0) {
        let totalMembers = 0;
        let largestPod = { title: "", count: 0 };
        activePods.forEach(([_, data]) => {
            const count = data.members ? data.members.length : 0;
            totalMembers += count;
            if (count > largestPod.count) {
                largestPod = { title: data.activityTitle, count };
            }
        });
        const avg = (totalMembers / activePods.length).toFixed(1);
        parts.push(`Active pods average <strong>${avg}</strong> members each. The largest active pod is "<strong>${sanitize(largestPod.title)}</strong>" with <strong>${largestPod.count}</strong> member${largestPod.count !== 1 ? "s" : ""}.`);
    }

    // Most popular type
    const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
    if (sortedTypes.length > 0) {
        const [topType, topCount] = sortedTypes[0];
        const pct = ((topCount / total) * 100).toFixed(0);
        parts.push(`The most popular activity format is <strong>${sanitize(topType)}</strong>, accounting for <strong>${pct}%</strong> of all pods.`);
    }

    // Top keywords
    if (topKeywords.length > 0) {
        const top3 = topKeywords.slice(0, 3).map(([w]) => `"<strong>${sanitize(w)}</strong>"`).join(", ");
        parts.push(`The most common themes in pod titles include ${top3}.`);
    }

    // Rejection rate
    if (rejectedPods.length > 0) {
        const submittedTotal = activePods.length + proposalPods.length + rejectedPods.length;
        const rejPct = ((rejectedPods.length / submittedTotal) * 100).toFixed(0);
        parts.push(`The rejection rate is <strong>${rejPct}%</strong> (${rejectedPods.length} out of ${submittedTotal} reviewed).`);
    }

    summaryEl.innerHTML = parts.join(" ");
}

// ===========================
// Team Participation Panel
// ===========================
function updateParticipationPanel(activePods, proposalPods, pendingPods) {
    const countsEl = document.getElementById("participationCounts");
    const activeListEl = document.getElementById("participationListActive");
    const inactiveListEl = document.getElementById("participationListInactive");
    if (!countsEl || !activeListEl || !inactiveListEl) return;

    // Collect all active aliases (anyone who created, voted for, or joined a pod)
    const activeAliases = new Set();
    const allPodEntries = [...activePods, ...proposalPods, ...pendingPods];
    allPodEntries.forEach(([_, data]) => {
        // Organizer/members
        if (data.members) {
            data.members.forEach(m => activeAliases.add(m.name));
        }
        // Voters
        if (data.votes) {
            data.votes.forEach(v => activeAliases.add(v.name));
        }
        // Organizer name (in case they aren't in members yet, e.g. pending)
        if (data.organizerName) {
            activeAliases.add(data.organizerName);
        }
    });

    // Build full alias list from aliasMap (uppercase alias -> fullName)
    // Create entries sorted by full name
    const allEntries = Object.entries(aliasMap).map(([aliasUpper, fullName]) => ({
        alias: aliasUpper,
        fullName
    }));

    const activeList = allEntries.filter(e => activeAliases.has(e.fullName)).sort((a, b) => a.fullName.localeCompare(b.fullName));
    const inactiveList = allEntries.filter(e => !activeAliases.has(e.fullName)).sort((a, b) => a.fullName.localeCompare(b.fullName));

    countsEl.innerHTML = `<span>✅ ${activeList.length} Active</span> <span>⬜ ${inactiveList.length} Inactive</span>`;

    function renderTable(list) {
        if (list.length === 0) return '<p class="report-empty">No users in this category.</p>';
        const rows = list.map(e => `<tr><td>${sanitize(e.alias)}</td><td>${sanitize(e.fullName)}</td></tr>`).join("");
        return `<table><thead><tr><th>Alias</th><th>Full Name</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    activeListEl.innerHTML = renderTable(activeList);
    inactiveListEl.innerHTML = renderTable(inactiveList);
}

// Participation tab switching
document.querySelectorAll(".participation-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".participation-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.tab;
        document.getElementById("participationListActive").style.display = target === "active" ? "" : "none";
        document.getElementById("participationListInactive").style.display = target === "inactive" ? "" : "none";
    });
});

// ===========================
// Site Traffic Chart
// ===========================
let trafficChart = null;

function renderTrafficChart(daysBack) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    cutoff.setHours(0, 0, 0, 0);

    pageViewsCollection
        .where("date", ">=", cutoff.toISOString().split("T")[0])
        .get()
        .then(snapshot => {
            // Aggregate by date
            const counts = {};
            snapshot.forEach(doc => {
                const d = doc.data().date;
                counts[d] = (counts[d] || 0) + 1;
            });

            // Build array for each day in range
            const labels = [];
            const data = [];
            for (let i = daysBack - 1; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const key = d.toISOString().split("T")[0];
                labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
                data.push(counts[key] || 0);
            }

            // Render chart
            const canvas = document.getElementById("trafficChart");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");

            if (trafficChart) trafficChart.destroy();

            const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#6366f1";

            trafficChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: "Page Views",
                        data,
                        borderColor: accentColor,
                        backgroundColor: accentColor + "22",
                        fill: true,
                        tension: 0.3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { precision: 0 }
                        }
                    }
                }
            });

            // Render timeline below chart
            const timelineEl = document.getElementById("trafficTimeline");
            if (timelineEl) {
                const entries = labels.map((lbl, idx) => ({
                    label: lbl,
                    count: data[idx]
                })).reverse();
                timelineEl.innerHTML = entries.map(e =>
                    `<div class="traffic-timeline-entry">
                        <span class="traffic-timeline-date">${e.label}</span>
                        <span class="traffic-timeline-count">${e.count} view${e.count !== 1 ? "s" : ""}</span>
                    </div>`
                ).join("");
            }
        })
        .catch(err => console.warn("Traffic chart error:", err));
}

// Traffic range filter
const trafficRangeFilter = document.getElementById("trafficRangeFilter");
if (trafficRangeFilter) {
    trafficRangeFilter.addEventListener("change", () => {
        renderTrafficChart(parseInt(trafficRangeFilter.value));
    });
    // Initial render
    renderTrafficChart(parseInt(trafficRangeFilter.value));
}

// ===========================
// Announcement Banner
// ===========================
const bannerEl = document.getElementById("announcementBanner");
const bannerTextEl = document.getElementById("announcementText");
const bannerDismissBtn = document.getElementById("announcementDismiss");
const bannerMessageInput = document.getElementById("bannerMessage");
const bannerSaveBtn = document.getElementById("bannerSaveBtn");
const bannerToggleBtn = document.getElementById("bannerToggleBtn");
const bannerStatusEl = document.getElementById("bannerStatus");
const bannerDoc = db.collection("settings").doc("announcement");

let bannerDismissed = false;

// Real-time listener for banner state
bannerDoc.onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        const enabled = data.enabled === true;
        const message = data.message || "";

        // Update admin controls
        if (bannerMessageInput) bannerMessageInput.value = message;
        if (bannerToggleBtn) bannerToggleBtn.textContent = enabled ? "Disable" : "Enable";
        if (bannerStatusEl) bannerStatusEl.textContent = enabled ? "Status: Enabled" : "Status: Disabled";

        // Show/hide banner for all users
        if (enabled && message && !bannerDismissed) {
            bannerTextEl.textContent = message;
            bannerEl.style.display = "";
        } else {
            bannerEl.style.display = "none";
        }
    } else {
        // No doc yet
        if (bannerToggleBtn) bannerToggleBtn.textContent = "Enable";
        if (bannerStatusEl) bannerStatusEl.textContent = "Status: No announcement set";
        bannerEl.style.display = "none";
    }
});

// Dismiss banner (hides until next visit / page reload)
if (bannerDismissBtn) {
    bannerDismissBtn.addEventListener("click", () => {
        bannerDismissed = true;
        bannerEl.style.display = "none";
    });
}

// Admin: Save banner message
if (bannerSaveBtn) {
    bannerSaveBtn.addEventListener("click", async () => {
        const message = bannerMessageInput.value.trim();
        await bannerDoc.set({ message, enabled: false }, { merge: true });
    });
}

// Admin: Toggle banner enabled/disabled
if (bannerToggleBtn) {
    bannerToggleBtn.addEventListener("click", async () => {
        const doc = await bannerDoc.get();
        const currentEnabled = doc.exists ? doc.data().enabled === true : false;
        const message = bannerMessageInput ? bannerMessageInput.value.trim() : "";
        if (!currentEnabled && !message) {
            alert("Please write a banner message before enabling.");
            return;
        }
        await bannerDoc.set({ enabled: !currentEnabled, message }, { merge: true });
    });
}

// Hook into existing snapshot listeners to trigger reporting updates
const originalProposalListener = podsCollection.where("status", "==", "proposal");
const originalActiveListener = podsCollection.where("status", "==", "active");
const originalPendingListener = podsCollection.where("status", "==", "pending");

// Override: add updateReporting calls to existing snapshot callbacks
// (These are already running — we just add additional watches)
podsCollection.where("status", "==", "proposal").onSnapshot(() => updateReporting());
podsCollection.where("status", "==", "active").onSnapshot(() => updateReporting());
podsCollection.where("status", "==", "pending").onSnapshot(() => updateReporting());

// ===========================
// Feedback / Bug Report Button
// ===========================
(function () {
    const feedbackFab = document.getElementById("feedbackFab");
    const feedbackModal = document.getElementById("feedbackModal");
    const closeFeedbackModal = document.getElementById("closeFeedbackModal");

    if (feedbackFab && feedbackModal) {
        feedbackFab.addEventListener("click", () => openModal(feedbackModal));
        closeFeedbackModal.addEventListener("click", () => closeModalFn(feedbackModal));
    }
})();

// ===========================
// Site Lock Feature
// ===========================
let siteLocked = false;
let siteLockDate = null;
let siteLockCountdownInterval = null;

const siteLockDoc = db.collection("settings").doc("siteLock");
const siteLockBanner = document.getElementById("siteLockBanner");
const siteLockBannerText = document.getElementById("siteLockBannerText");
const lockSiteBtn = document.getElementById("lockSiteBtn");
const unlockSiteBtn = document.getElementById("unlockSiteBtn");
const bannerUnlockBtn = document.getElementById("bannerUnlockBtn");
const siteLockModal = document.getElementById("siteLockModal");
const closeSiteLockModal = document.getElementById("closeSiteLockModal");
const siteLockSubmitBtn = document.getElementById("siteLockSubmitBtn");

// Listen for site lock state in real time
siteLockDoc.onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        siteLockDate = data.lockDate ? new Date(data.lockDate) : null;
        siteLocked = data.locked === true;
    } else {
        siteLocked = false;
        siteLockDate = null;
    }
    updateSiteLockUI();
});

function updateSiteLockUI() {
    // Clear existing countdown
    if (siteLockCountdownInterval) {
        clearInterval(siteLockCountdownInterval);
        siteLockCountdownInterval = null;
    }

    const now = new Date();

    if (siteLocked) {
        // Site is currently locked
        siteLockBanner.style.display = "flex";
        siteLockBannerText.textContent = "This site is currently locked. Creating pods, voting, and joining are disabled.";
        document.body.classList.add("site-locked");
        // Admin buttons
        if (lockSiteBtn) lockSiteBtn.style.display = "none";
        if (unlockSiteBtn) unlockSiteBtn.style.display = "inline-block";
        if (bannerUnlockBtn) bannerUnlockBtn.style.display = isAdmin ? "inline-block" : "none";
    } else if (siteLockDate && siteLockDate > now) {
        // Lock date is in the future — show countdown
        siteLockBanner.style.display = "flex";
        document.body.classList.remove("site-locked");
        startLockCountdown();
        // Admin buttons
        if (lockSiteBtn) lockSiteBtn.style.display = "none";
        if (unlockSiteBtn) unlockSiteBtn.style.display = "inline-block";
        if (bannerUnlockBtn) bannerUnlockBtn.style.display = isAdmin ? "inline-block" : "none";
    } else {
        // Not locked, no pending lock
        siteLockBanner.style.display = "none";
        document.body.classList.remove("site-locked");
        // Admin buttons
        if (lockSiteBtn) lockSiteBtn.style.display = "inline-block";
        if (unlockSiteBtn) unlockSiteBtn.style.display = "none";
        if (bannerUnlockBtn) bannerUnlockBtn.style.display = "none";
    }
}

function startLockCountdown() {
    function updateCountdown() {
        const now = new Date();
        const diff = siteLockDate - now;

        if (diff <= 0) {
            // Time's up — lock the site
            clearInterval(siteLockCountdownInterval);
            siteLockCountdownInterval = null;
            siteLockDoc.update({ locked: true });
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (n) => n.toString().padStart(2, "0");
        siteLockBannerText.textContent = `Site locks in: ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    }
    updateCountdown();
    siteLockCountdownInterval = setInterval(updateCountdown, 1000);
}

function isSiteLocked() {
    if (siteLocked) return true;
    if (siteLockDate && new Date() >= siteLockDate) return true;
    return false;
}

// Admin: Open lock site modal
if (lockSiteBtn) {
    lockSiteBtn.addEventListener("click", () => {
        document.getElementById("siteLockDate").value = "";
        document.getElementById("siteLockTime").value = "";
        openModal(siteLockModal);
    });
}

// Admin: Close lock site modal
if (closeSiteLockModal) {
    closeSiteLockModal.addEventListener("click", () => closeModalFn(siteLockModal));
}

// Admin: Submit lock date
if (siteLockSubmitBtn) {
    siteLockSubmitBtn.addEventListener("click", async () => {
        const dateVal = document.getElementById("siteLockDate").value;
        const timeVal = document.getElementById("siteLockTime").value;
        if (!dateVal || !timeVal) {
            alert("Please select both a date and time.");
            return;
        }

        const lockDateTime = new Date(`${dateVal}T${timeVal}`);
        const now = new Date();

        if (lockDateTime <= now) {
            // Lock immediately
            await siteLockDoc.set({ locked: true, lockDate: lockDateTime.toISOString() }, { merge: true });
        } else {
            // Set future lock date
            await siteLockDoc.set({ locked: false, lockDate: lockDateTime.toISOString() }, { merge: true });
        }

        closeModalFn(siteLockModal);
    });
}

// Admin: Unlock site
if (unlockSiteBtn) {
    unlockSiteBtn.addEventListener("click", async () => {
        await siteLockDoc.set({ locked: false, lockDate: null }, { merge: true });
    });
}

// Admin: Unlock site from banner
if (bannerUnlockBtn) {
    bannerUnlockBtn.addEventListener("click", async () => {
        await siteLockDoc.set({ locked: false, lockDate: null }, { merge: true });
    });
}
