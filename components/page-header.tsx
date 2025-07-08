interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-[48rem] px-4 py-16 text-center lg:px-16">
      <h1 className="animate-fade-up pb-3 text-3xl leading-tight font-bold opacity-0 [animation-delay:100ms] md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground animate-fade-up opacity-0 [animation-delay:200ms]">
        {description}
      </p>
    </div>
  );
}
