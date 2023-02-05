import { rate, Rating } from 'ts-trueskill';

// Create new rating with defaults
const defaultRating = new Rating()

// Load rating with values Rating(mu, sigma)
const loadedRating = new Rating(25, 8)

// Values that will need to be saved to DB
defaultRating.mu
defaultRating.sigma

//////// Resolve match between teams /////////

// First load/create ratings
const r1 = new Rating()
const r2 = new Rating()
const r3 = new Rating()
const r4 = new Rating()

// Form teams
const t1 = [r1, r2]
const t2 = [r3]
const t3 = [r4]
const teams = [t1, t2, t3]

// Form ranks (starting at 0, lower is better, duplicates allowed)
const ranks = [0, 1, 1]

// Calculate rating updates
const updated_teams = rate(teams, ranks)
console.log(updated_teams);