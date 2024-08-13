# HealthQuest

## Overview

**HealthQuest** is a comprehensive health and wellness platform that empowers users to achieve their fitness goals through personalized activity tracking, tailored wellness challenges, and actionable health advice. With a sleek and mobile-friendly interface, HealthQuest allows users to log workouts, monitor progress, and engage with a supportive community, all while ensuring the security and privacy of their personal health data.

## Features

- **Activity Logging:** Effortlessly record workouts, including type, duration, and intensity, and review past sessions to advance toward personal fitness goals.
- **Tailored Wellness Challenges:** Participate in personalized wellness challenges that adapt to your activity level and progress.
- **Personalized Health Advice:** Receive actionable health tips based on your logged activities and challenge performance.
- **Community Support:** Engage with a community of users through support groups and share your journey.
- **Mobile-Friendly Design:** Access HealthQuest seamlessly on any device with a responsive and intuitive UI.
- **Secure Data Management:** Your health data is securely stored and protected, giving you peace of mind.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **API:** GraphQL
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Deployed on Render

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NatalieClinton/HealthQuest.git
   cd HealthQuest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Access the application:**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign up or log in to your HealthQuest account.**
2. **Log your workouts, including details like type, duration, and intensity.**
3. **Join personalized wellness challenges and track your progress.**
4. **Receive tailored health advice based on your logged activities.**
5. **Engage with the community through support groups and share your journey.**

## Future Development

- **Integration with wearable devices** to automatically sync fitness data.
- **Enhanced analytics dashboard** for deeper insights into your health trends.
- **Virtual fitness coaching** with real-time feedback based on your activity data.
- **Social media integration** for sharing achievements and milestones.

## Contributing

We welcome contributions to enhance HealthQuest! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact us at [support@healthquest.com](mailto:support@healthquest.com).

## Acknowledgments

- **React:** For the powerful frontend framework.
- **Node.js and Express.js:** For the reliable backend infrastructure.
- **MongoDB and Mongoose:** For the flexible and scalable database solutions.
- **GraphQL:** For the efficient and flexible API.