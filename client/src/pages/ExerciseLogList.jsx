import { useQuery } from '@apollo/client';
import { GET_EXERCISE_LOGS } from '../utils/queries';

const ExerciseLogList = () => {
  const { data, loading, error } = useQuery(GET_EXERCISE_LOGS);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error fetching logs: {error.message}</p>;

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-8">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Exercise Logs</h4>
          <div className="card-body">
            {data?.myExerciseLogs.length === 0 ? (
              <p>No logs found.</p>
            ) : (
              <ul className="list-group">
                {data.myExerciseLogs.map((log) => (
                  <li key={log._id} className="list-group-item">
                    <strong>Category:</strong> {log.category.name}<br />
                    <strong>Duration:</strong> {log.duration} minutes<br />
                    <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExerciseLogList;
