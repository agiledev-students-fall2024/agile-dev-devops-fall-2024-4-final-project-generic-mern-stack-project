const TextAndButton = (props) => {
    return (
        <div className="flex flex-row justify-between items-center space-x-40 bg-lavender_blush-900 py-4 px-8 border-[1px] border-rose-900 w-full">
            <p className="text-ebony font-bold">{props.text}</p>
            <button className="text-ebony-700 font-bold border border-ebony-800 py-1 px-2 rounded-md hover:border-rose hover:text-rose" onClick={() => console.log('do action')}>{props.button}</button>
        </div>
    )
}

export default TextAndButton