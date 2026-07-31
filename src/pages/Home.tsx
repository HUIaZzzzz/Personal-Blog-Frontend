function Home() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm xs:p-6 desktop:p-8">
      <h1 className="mb-2 scroll-m-20 text-xl font-extrabold tracking-tight xs:text-2xl lg:text-3xl">
        自定义断点生效！
      </h1>
      <p className="text-sm text-muted-foreground xs:text-base">
        当前断点配置：
        <br />
        <span className="font-mono text-xs">
          xs: 576px &nbsp;|&nbsp; lg: 1024px &nbsp;|&nbsp; desktop: 1440px
        </span>
      </p>

      {/* 测试卡片 */}
      <div className="mt-6 grid grid-cols-1 gap-3 xs:grid-cols-2 desktop:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md bg-muted/50 p-4 text-center xs:text-left"
          >
            <p className="text-sm font-medium">卡片 {i}</p>
            <p className="text-xs text-muted-foreground">数据概览</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
