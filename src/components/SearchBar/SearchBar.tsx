import { Formik, Form, Field, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

interface SearchFormValues {
  query: string;
}

const initialValues: SearchFormValues = {
  query: '',
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    const searchword = values.query.trim();

    if (searchword) {
      onSubmit(searchword);
      actions.resetForm();
    } else {
      toast.error('Please enter your search query.');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
