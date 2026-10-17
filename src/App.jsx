import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clapperboard,
  Info,
  Menu,
  Play,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const SHOWS = [
  {
    id: "tideglass",
    title: "The Tideglass",
    genre: "Mystery",
    year: 2026,
    runtime: "6 episodes",
    rating: "A",
    description: "On a quiet island, the tide carries pieces of tomorrow onto the shore. A lighthouse keeper and a cartographer begin mapping what should not yet exist.",
    palette: "tide",
    artwork: "tide",
    label: "AFTERGLOW ORIGINAL",
    featured: true,
  },
  {
    id: "orbit-house",
    title: "Orbit House",
    genre: "Sci-Fi",
    year: 2025,
    runtime: "8 episodes",
    rating: "A",
    description: "The last residents of a drifting hotel keep its rooms warm for guests who may never arrive. Then one night, every doorbell rings at once.",
    palette: "orbit",
    artwork: "orbit",
    label: "NEW SERIES",
  },
  {
    id: "mosslight",
    title: "Mosslight",
    genre: "Adventure",
    year: 2025,
    runtime: "1h 48m",
    rating: "A",
    description: "A young field biologist follows a trail of glowing spores into a forest that seems to remember everyone who has ever walked beneath its canopy.",
    palette: "moss",
    artwork: "moss",
    label: "VIEWER FAVORITE",
  },
  {
    id: "soft-static",
    title: "Soft Static",
    genre: "Drama",
    year: 2024,
    runtime: "7 episodes",
    rating: "A",
    description: "A late-night radio host starts receiving dedications from a town that disappeared from the map forty years ago.",
    palette: "static",
    artwork: "static",
    label: "A QUIET KIND OF MAGIC",
  },
  {
    id: "blue-hour",
    title: "Blue Hour Club",
    genre: "Comedy",
    year: 2026,
    runtime: "5 episodes",
    rating: "A",
    description: "Four strangers inherit a tiny after-hours café and discover that closing time is when the neighborhood gets interesting.",
    palette: "blue",
    artwork: "blue",
    label: "JUST ADDED",
  },
  {
    id: "paper-moon",
    title: "Paper Moon Motel",
    genre: "Mystery",
    year: 2024,
    runtime: "1h 36m",
    rating: "A",
    description: "Every guest at a desert roadside motel checks out with a different memory of the same missing night.",
    palette: "paper",
    artwork: "paper",
    label: "MIDNIGHT PICK",
  },
  {
    id: "wild-meridian",
    title: "Wild Meridian",
    genre: "Adventure",
    year: 2025,
    runtime: "6 episodes",
    rating: "A",
    description: "A courier crosses a floating archipelago to deliver a letter with no address and a postmark dated a century from now.",
    palette: "wild",
    artwork: "wild",
    label: "A NEW HORIZON",
  },
  {
    id: "echo-garden",
    title: "The Echo Garden",
    genre: "Sci-Fi",
    year: 2026,
    runtime: "1h 52m",
    rating: "A",
    description: "In a city where memories grow on trees, a gardener finds a seed that remembers a life no one has lived.",
    palette: "echo",
    artwork: "echo",
    label: "AFTERGLOW FILM",
  },
  {
    id: "small-hours",
    title: "Small Hours",
    genre: "Drama",
    year: 2025,
    runtime: "8 episodes",
    rating: "A",
    description: "Three night-shift workers at an all-night flower shop help the city say what it cannot say during daylight.",
    palette: "hours",
    artwork: "hours",
    label: "FROM THE COLLECTION",
  },
  {
    id: "cloudline",
    title: "Cloudline",
    genre: "Adventure",
    year: 2024,
    runtime: "1h 41m",
    rating: "A",
    description: "Two siblings follow a hand-drawn map through a mountain range where the clouds settle low enough to walk through.",
    palette: "cloud",
    artwork: "cloud",
    label: "WIDE OPEN SPACES",
  },
  {
    id: "last-light",
    title: "The Last Lightkeeper",
    genre: "Mystery",
    year: 2025,
    runtime: "6 episodes",
    rating: "A",
    description: "When the old lighthouse goes dark, its keeper receives letters from the sea, each one signed in his own handwriting.",
    palette: "last",
    artwork: "last",
    label: "AN AFTERGLOW MYSTERY",
  },
  {
    id: "velvet-sky",
    title: "Velvet Sky",
    genre: "Sci-Fi",
    year: 2026,
    runtime: "1h 55m",
    rating: "A",
    description: "An amateur astronomer discovers a constellation that only appears above one small neighborhood—and it is changing shape.",
    palette: "velvet",
    artwork: "velvet",
    label: "LOOK UP",
  },
];

const GENRES = ["All stories", "Adventure", "Comedy", "Drama", "Mystery", "Sci-Fi"];
const MY_LIST_KEY = "afterglow-my-list-v1";

function PosterArt({ show, className = "" }) {
  return (
    <div className={`poster-art art-${show.artwork} ${className}`} aria-hidden="true">
      <div className="art-grain" />
      <div className="art-shape shape-back" />
      <div className="art-shape shape-mid" />
      <div className="art-shape shape-front" />
      <span className="art-star star-a">✦</span>
      <span className="art-star star-b">✧</span>
      <span className="art-orbit-line" />
      <div className="art-copy">
        <span>{show.label}</span>
        <strong>{show.title}</strong>
        <small>{show.genre} · {show.year}</small>
      </div>
    </div>
  );
}

function DetailDialog({ show, saved, onClose, onToggleSave }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="detail-backdrop" onMouseDown={onClose}>
      <section
        className="detail-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <PosterArt show={show} className="detail-art" />
        <button className="detail-close" type="button" aria-label="Close details" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="detail-content">
          <p className="detail-eyebrow"><Sparkles size={13} /> {show.label}</p>
          <h2 id="detail-title">{show.title}</h2>
          <div className="detail-meta">
            <span className="match-score">A ORIGINAL</span>
            <span>{show.year}</span>
            <span>{show.runtime}</span>
            <span className="age-rating">{show.rating}</span>
          </div>
          <p className="detail-description">{show.description}</p>
          <p className="detail-genre">Genre <span>{show.genre}</span></p>
          <div className="detail-actions">
            <button className="watch-button" type="button" onClick={onClose}>
              <Play size={17} fill="currentColor" /> Start exploring
            </button>
            <button className={`save-button${saved ? " is-saved" : ""}`} type="button" onClick={() => onToggleSave(show.id)}>
              {saved ? <Check size={18} /> : <Plus size={19} />}
              <span>{saved ? "In My List" : "My List"}</span>
            </button>
          </div>
          <p className="demo-disclaimer">Original fictional concept created for this interface demo.</p>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [genre, setGenre] = useState("All stories");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(MY_LIST_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((id) => SHOWS.some((show) => show.id === id)) : [];
    } catch {
      return [];
    }
  });
  const [showMyList, setShowMyList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const rowRefs = useRef({});
  const heroShow = SHOWS[0];

  const filteredShows = useMemo(() => SHOWS.filter((show) => {
    const matchesGenre = genre === "All stories" || show.genre === genre;
    const searchText = `${show.title} ${show.genre} ${show.description}`.toLowerCase();
    const matchesSearch = !submittedQuery || searchText.includes(submittedQuery.toLowerCase());
    const matchesList = !showMyList || savedIds.includes(show.id);
    return matchesGenre && matchesSearch && matchesList;
  }), [genre, savedIds, showMyList, submittedQuery]);

  const savedShows = useMemo(
    () => SHOWS.filter((show) => savedIds.includes(show.id)),
    [savedIds],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(MY_LIST_KEY, JSON.stringify(savedIds));
    } catch {
      setToast("Your list could not be saved in this browser.");
    }
  }, [savedIds]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2300);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function toggleSaved(id) {
    const wasSaved = savedIds.includes(id);
    setSavedIds((current) => (
      wasSaved ? current.filter((item) => item !== id) : [...current, id]
    ));
    setToast(wasSaved ? "Removed from My List" : "Added to My List");
  }

  function scrollRow(genreName, direction) {
    rowRefs.current[genreName]?.scrollBy({
      left: direction * 560,
      behavior: "smooth",
    });
  }

  const filteredGenres = showMyList
    ? ["Saved for later"]
    : genre === "All stories"
      ? GENRES.slice(1)
      : [genre];

  return (
    <div className="app-shell">
      <header className={`site-header${showMyList ? " is-list-view" : ""}`}>
        <a className="brand" href="#home" onClick={() => { setShowMyList(false); setGenre("All stories"); }}>
          <span className="brand-symbol"><span /></span>
          <span>afterglow</span>
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a href="#home" className={!showMyList ? "active" : ""} onClick={() => { setShowMyList(false); setMenuOpen(false); }}>Discover</a>
          <button type="button" className={showMyList ? "active" : ""} onClick={() => { setShowMyList(true); setMenuOpen(false); setGenre("All stories"); }}>
            My List {savedIds.length > 0 && <span className="list-count">{savedIds.length}</span>}
          </button>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="header-actions">
          <form
            className="header-search"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmittedQuery(query.trim());
              setShowMyList(false);
              document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Search size={16} />
            <input
              aria-label="Search stories"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <button className="menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="profile-dot" aria-label="Profile">A</span>
        </div>
      </header>

      <main id="home">
        {!showMyList && (
          <section className="hero">
            <PosterArt show={heroShow} className="hero-artwork" />
            <div className="hero-vignette" />
            <div className="hero-content">
              <p className="hero-kicker"><span className="brand-symbol small"><span /></span> AN AFTERGLOW ORIGINAL</p>
              <p className="hero-label">A story for the in-between</p>
              <h1>The Tideglass</h1>
              <div className="hero-meta">
                <span className="match-score">98% for you</span>
                <span>2026</span>
                <span>6 episodes</span>
                <span className="age-rating">A</span>
              </div>
              <p className="hero-description">
                The tide carries pieces of tomorrow onto a quiet island. One lighthouse keeper is about to learn that some things arrive before they are lost.
              </p>
              <div className="hero-actions">
                <button className="hero-play" type="button" onClick={() => setSelectedShow(heroShow)}>
                  <Play size={17} fill="currentColor" /> Explore story
                </button>
                <button className="hero-more" type="button" onClick={() => setSelectedShow(heroShow)}>
                  <Info size={17} /> More info
                </button>
              </div>
            </div>
            <div className="hero-side-note"><span /> FEATURED STORY</div>
            <a className="scroll-cue" href="#library" aria-label="Scroll to stories"><ArrowDown size={16} /></a>
          </section>
        )}

        <section className="library" id="library">
          <div className="library-heading">
            <div>
              <p className="section-kicker">{showMyList ? "YOUR PERSONAL COLLECTION" : "MADE FOR THE MOMENT"}</p>
              <h2>{showMyList ? "My List" : "Find your next world"}</h2>
            </div>
            {showMyList ? (
              <button className="clear-filter" type="button" onClick={() => setShowMyList(false)}>Back to discover</button>
            ) : (
              <div className="genre-pills" aria-label="Filter by genre">
                {GENRES.map((item) => (
                  <button
                    className={genre === item ? "selected" : ""}
                    type="button"
                    key={item}
                    onClick={() => setGenre(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {submittedQuery && (
            <div className="search-result-note">
              <span>Results for “{submittedQuery}”</span>
              <button type="button" onClick={() => { setSubmittedQuery(""); setQuery(""); }}>Clear search <X size={14} /></button>
            </div>
          )}

          {showMyList && savedShows.length === 0 ? (
            <div className="empty-list">
              <span><Plus size={25} /></span>
              <h3>Your list is waiting for a story.</h3>
              <p>Save a title from its details and it will be right here next time.</p>
              <button type="button" onClick={() => setShowMyList(false)}>Explore stories <ArrowRight size={15} /></button>
            </div>
          ) : filteredShows.length === 0 ? (
            <div className="empty-list">
              <span><Search size={23} /></span>
              <h3>No stories found</h3>
              <p>Try a different title or genre.</p>
              <button type="button" onClick={() => { setGenre("All stories"); setSubmittedQuery(""); setQuery(""); }}>Clear filters <X size={14} /></button>
            </div>
          ) : (
            filteredGenres.map((genreName) => {
              const rowShows = showMyList
                ? filteredShows
                : filteredShows.filter((show) => show.genre === genreName);
              if (rowShows.length === 0) return null;
              return (
                <section className="story-row" key={genreName} aria-label={`${genreName} stories`}>
                  <div className="row-heading">
                    <h3>{showMyList ? "Saved for later" : `${genreName} stories`} <ChevronRight size={17} /></h3>
                    {!showMyList && (
                      <div className="row-arrows">
                        <button type="button" aria-label={`Scroll ${genreName} stories left`} onClick={() => scrollRow(genreName, -1)}><ChevronLeft size={17} /></button>
                        <button type="button" aria-label={`Scroll ${genreName} stories right`} onClick={() => scrollRow(genreName, 1)}><ChevronRight size={17} /></button>
                      </div>
                    )}
                  </div>
                  <div
                    className="story-track"
                    ref={(node) => { rowRefs.current[genreName] = node; }}
                    tabIndex="0"
                    aria-label={`${genreName} carousel`}
                  >
                    {rowShows.map((show) => (
                      <button className="story-card" type="button" key={show.id} onClick={() => setSelectedShow(show)}>
                        <PosterArt show={show} className="card-poster" />
                        <span className="card-play"><CirclePlay size={38} /></span>
                        <span className="card-caption">
                          <strong>{show.title}</strong>
                          <span>{show.year} <i /> {show.runtime}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </section>
      </main>

      <section className="about-section" id="about">
        <div className="about-mark"><Clapperboard size={20} /></div>
        <div>
          <p className="section-kicker">STORIES AFTER HOURS</p>
          <h2>A little escape, made original.</h2>
          <p>
            Afterglow is a fictional streaming-style interface built around original story concepts. Every title and synopsis here was created for this demo; there are no real shows, studios, or streaming subscriptions behind the experience.
          </p>
        </div>
        <span className="about-spark"><Sparkles size={27} /></span>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-symbol"><span /></span>
          <span>afterglow</span>
        </a>
        <span>Original fictional stories · Interface demo</span>
        <span>© 2026 Afterglow</span>
      </footer>

      {selectedShow && (
        <DetailDialog
          show={selectedShow}
          saved={savedIds.includes(selectedShow.id)}
          onClose={() => setSelectedShow(null)}
          onToggleSave={toggleSaved}
        />
      )}
      {toast && <div className="toast" role="status"><Check size={15} />{toast}</div>}
    </div>
  );
}

export default App;
