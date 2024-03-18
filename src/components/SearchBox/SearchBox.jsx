import style from './SearchBox.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { Formik, Form, Field } from 'formik';

const SearchBox = () => {
    const [searchData, setSearchData] = useSearchParams();
    const query = searchData.get('query') ?? '';

    const handleSubmit = (values) => {
        if (values.query.trim() === '') {
            toast.error('Enter a search query');
            return;
        }
        searchData.set('query', values.query);
        setSearchData(searchData);
    };

    return (
        <>
            <Formik
                initialValues={{ query: query }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label>
                        <span className={style.icon}>
                            <IoSearchSharp size={24} />
                        </span>
                        <Field
                            type="text"
                            name="query"
                            placeholder="Search movies here"
                            className={style.input}
                        />
                    </label>
                </Form>
            </Formik>
            <Toaster />
        </>
    );
};

export default SearchBox;