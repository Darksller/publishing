import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
type Props = {
	labels: string[]
	content: React.ReactNode[]
}

export function TabsWrapper({ labels, content }: Props) {
	return (
		<Tabs defaultValue={labels[0]}>
			<TabsList className='flex w-fit m-auto gap-4'>
				{labels.map(item => (
					<TabsTrigger key={item} value={item}>
						{item}
					</TabsTrigger>
				))}
			</TabsList>
			{content.map((item, index) => (
				<TabsContent key={index} value={labels[index]}>
					{item}
				</TabsContent>
			))}
		</Tabs>
	)
}
