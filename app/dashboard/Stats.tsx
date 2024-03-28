const Stats = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="mt-16 stats stats-vertical lg:stats-horizontal shadow w-full z-20 dark:bg-zinc-900 dark:text-zinc-50 max-w-6xl flex flex-col sm:flex-row border dark:border-zinc-800">
        <div className="stat  dark:bg-zinc-900 z-20">
          <div className="stat-title dark:text-zinc-400">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc dark:text-zinc-400">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat dark:bg-zinc-900 z-20">
          <div className="stat-title dark:text-zinc-400">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc dark:text-zinc-400">↗︎ 400 (22%)</div>
        </div>

        <div className="stat dark:bg-zinc-900 z-20">
          <div className="stat-title dark:text-zinc-400">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc dark:text-zinc-400">↘︎ 90 (14%)</div>
        </div>

        <div className="stat dark:bg-zinc-900 z-20">
          <div className="stat-title dark:text-zinc-400">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc dark:text-zinc-400">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
