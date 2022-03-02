import React, { useState } from 'react'
import { createPost } from '../api'

const CreatePost = () => {

    const [details, setDetails] = useState({
        picture: "",
        caption: ""
    })

    const [flash, setFlash] = useState({
        state: false,
        type: '',
        text: ''
    })

    function setInfo(name, value) {
        setDetails({
            ...details,
            [name]: value
        })
    }

    async function create(e) {
        e.preventDefault()

        try {
            const { data } = await createPost({
                picture: details.picture,
                caption: details.caption
            })
            setFlash({
                state: true,
                type: 'success',
                text: data.message
            })

        } catch (error) {
            console.log(error);
            setFlash({
                state: true,
                type: 'error',
                text: error.response.data.err
            })
        }
    }
    return (
        <div className='container mx-auto flex-center flex-col'>
            {
                flash.state ?
                    flash.type === 'success' ?
                        <h2 className='my-2 font-bold text-center text-green-500'>{flash.text}</h2>
                        :
                        flash.type === 'error' ?
                            <h2 className='my-2 font-bold text-center text-red-500'>{flash.text}</h2>
                            : <></> : <></>
            }
            <label
                className='font-bold block mx-auto w-max'
                htmlFor="img_url">Image URL</label>
            <input
                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                name="picture"
                style={{ borderBottom: '2px solid #dcdcdc' }}
                type='text'
                placeholder='Image URL here'
                className='w-96 h-10' />

            <label
                className='font-bold block mx-auto w-max mt-8'
                htmlFor="img_url">Caption</label>
            <input
                onChange={(e) => { setInfo(e.target.name, e.target.value) }}
                name="caption"
                style={{ borderBottom: '2px solid #dcdcdc' }}
                type='text'
                placeholder='Caption here'
                className='w-96 h-10' />

            <button
                onClick={create}
                className='w-48 h-12 bg-yellow-500 font-bold mt-6'>
                Create
            </button>
        </div>
    )
}

export default CreatePost