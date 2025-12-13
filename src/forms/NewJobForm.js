export const NewJobForm = () => {
    return (
        <div className="w-[80%] mx-auto rounded-lg border lato">
            <form className="border p-3 m-5 rounded-lg shadow">
                <div>
                    <p>Job Title</p>
                    <input type="text" className="border rounded text-[15px] w-[50%] mb-8" />

                </div>
                <p>Description</p>
                <textarea className="border rounded resize-none w-[50%]" rows="5" />

                <p>Location</p>
            </form>
        </div>
    )
}