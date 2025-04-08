# Front-End Engineer Take-Home Challenge

Design and implement a data visualization application that consumes and displays data in real time from multiple producers. The application should accurately plot the data from all producers with correlated timestamps.

**Requirements**

**Backend Server**

Integrate your Front-End with the provided rust-based server: Data Producer Backend.

Alternatively, optionally, implement the backend server yourself with the following specifications: **Data Producers**

Create 10 data producers, each generating random walk timeseries data. For each data point, include a timestamp and ensure that the timestamps are monotonically increasing.

Each producer should emit 1000 data points per second. Consider emitting the data in a rate digestible by Front End.

Assign a unique identifier to each producer.

**Frontend**

Design an intuitive, organized, and visually-appealing UI to display the real-time data from all 10 producers. Plot the data from each producer, correlated by timestamp.

Update the charts in real-time as new data arrives from the producers.

Optionally, provide extra features to users to only look at data within a specified timeframe and view data insights for each set of data within that timeframe (e.g., min, max, average).

Organize the described features into an intuitive and simple layout that does not overwhelm the users.

**Technical Requirements**

**Frontend**

React or another modern JavaScript framework (e.g., Angular , Vue.js ).

Well-structured, readable and maintainable code.

**Backend**

Integrate with the provided backend server OR use any preferred backend language to implement your own.

**Evaluation Criteria**

- Accuracy of plotting the data from all 10 producers with correlated timestamps. UI
- UX and overall user experience.
- Any optional features or enhancements.
- Code quality and maintainability.
- Technical documentation and testing.

**Submission Guidelines**

- Create a new Git repository
- Implement required features and test thoroughly.
- Provide technical documentation.
- Make repositories publicly accessible.
- Prepare to discuss design decisions and implementation.
- If using any code generator tools, mention it in the documentation. Feel free to use existing libraries and frameworks to simplify your implementation.
