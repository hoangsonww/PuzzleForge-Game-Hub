import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import { Sparkles, Grid3x3, Calculator, GitBranch, Trophy, Target, TrendingUp, BarChart3 } from "lucide-react";
import { useStatsStore } from "../store/statsStore";
import { motion } from "framer-motion";

/**
 * Home page displays all available games in a grid layout
 */
export default function Home() {
  const { stats, achievements } = useStatsStore();

  const games = [
    {
      title: "Wordle",
      description: "Guess the hidden 5-letter word in 6 tries. Classic word puzzle game!",
      icon: Sparkles,
      path: "/wordle",
      color: "lime",
    },
    {
      title: "Connections",
      description: "Find groups of four items that share something in common.",
      icon: GitBranch,
      path: "/connections",
      color: "purple",
    },
    {
      title: "Sudoku",
      description: "Fill the 9x9 grid with digits so each column, row, and 3x3 section contains 1-9.",
      icon: Grid3x3,
      path: "/sudoku",
      color: "blue",
    },
    {
      title: "Numbers",
      description: "Use mathematical operations to reach the target number. Daily brain teaser!",
      icon: Calculator,
      path: "/numbers",
      color: "yellow",
    },
  ];

  const totalWins = stats.wordle.won + stats.connections.won + stats.sudoku.won + stats.numbers.won;
  const totalPlayed = stats.wordle.played + stats.connections.played + stats.sudoku.played + stats.numbers.played;
  const winRate = totalPlayed > 0 ? ((totalWins / totalPlayed) * 100).toFixed(1) : '0';
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <Layout showBackButton={false}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 drop-shadow-2xl">
            🎮 Game Hub
          </h1>
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto mb-6">
            Challenge your mind with our collection of puzzle games. Pick your favorite and start playing!
          </p>
          <Link
            to="/statistics"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg"
          >
            <BarChart3 size={20} />
            View Detailed Statistics
          </Link>
        </motion.div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <Trophy className="mx-auto mb-2 text-yellow-400" size={32} />
            <p className="text-3xl font-extrabold">{totalWins}</p>
            <p className="text-sm mt-1">Total Wins</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <Target className="mx-auto mb-2 text-blue-400" size={32} />
            <p className="text-3xl font-extrabold">{winRate}%</p>
            <p className="text-sm mt-1">Win Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <TrendingUp className="mx-auto mb-2 text-green-400" size={32} />
            <p className="text-3xl font-extrabold">{stats.wordle.currentStreak}</p>
            <p className="text-sm mt-1">Current Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <Trophy className="mx-auto mb-2 text-purple-400" size={32} />
            <p className="text-3xl font-extrabold">{unlockedAchievements}/{achievements.length}</p>
            <p className="text-sm mt-1">Achievements</p>
          </motion.div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {games.map((game, idx) => (
            <motion.div
              key={game.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <GameCard {...game} />
            </motion.div>
          ))}
        </div>

        {/* Individual Game Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Game Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-lime-400">{stats.wordle.won}</p>
              <p className="text-sm mt-2">Wordle Wins</p>
              <p className="text-xs text-gray-400 mt-1">{stats.wordle.played} played</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-purple-400">{stats.connections.won}</p>
              <p className="text-sm mt-2">Connections</p>
              <p className="text-xs text-gray-400 mt-1">{stats.connections.played} played</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-blue-400">{stats.sudoku.won}</p>
              <p className="text-sm mt-2">Sudoku</p>
              <p className="text-xs text-gray-400 mt-1">{stats.sudoku.played} played</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-yellow-400">{stats.numbers.won}</p>
              <p className="text-sm mt-2">Numbers</p>
              <p className="text-xs text-gray-400 mt-1">{stats.numbers.played} played</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
