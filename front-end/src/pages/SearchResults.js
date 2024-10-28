import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'

const SearchResults = (props) => {
    const newData = props.items.filter(item => {
        return item.name.toLowerCase().includes(props.input.toLowerCase())
    })

    return (
        <section className="flex flex-col justify-center w-[100%] gap-0">
            {newData.map(item => (
                <div key={item.id} className="groups">
                    <TitleAndDescriptionBox
                        link={`/community/${item.id}`}
                        title={item.name}
                        description={item.description}
                    />
                </div>
            ))}
        </section>
    )
}

export default SearchResults