<template>
    <div class="about">
        <div class="about-header">
            <h1 class="about-title">About Stock Data Analysis Project</h1>
            <p class="about-description">
                This project leverages machine learning techniques to analyze and predict stock movements based on historical data.
                It includes functionalities for data analysis, predictive modeling, and backtesting to evaluate the effectiveness of the predictive models.
            </p>
        </div>

        <div class="about-features">
            <h2 class="about-subtitle">Features</h2>
            <ul class="about-feature-list">
                <li class="about-feature-item">
                    <strong>Analysis and Prediction:</strong> The project provides methods to analyze stock data and predict stock movements using machine learning models, specifically the Random Forest Classifier.
                </li>
                <li class="about-feature-item">
                    <strong>Backtesting:</strong> It includes backtesting capabilities to assess the performance of the predictive models over historical data, allowing for iterative improvements.
                </li>
                <li class="about-feature-item">
                    <strong>Prediction Types:</strong> The project supports different prediction types, enabling comparison and evaluation of various prediction strategies.
                </li>
                <li class="about-feature-item">
                    <strong>Asynchronous Processing:</strong> Certain tasks in the project are designed to run asynchronously, enhancing performance and scalability.
                </li>
            </ul>
        </div>

        <div class="about-tech-stack">
            <h2 class="about-subtitle">Technology Stack</h2>
            <ul class="about-tech-list">
                <li class="about-tech-item">
                    <strong>Python:</strong> The project is developed using Python, leveraging libraries such as scikit-learn for machine learning tasks and Pandas for data manipulation.
                </li>
                <li class="about-tech-item">
                    <strong>Machine Learning:</strong> Machine learning techniques, particularly classification using the Random Forest algorithm, are utilized for stock movement prediction.
                </li>
                <li class="about-tech-item">
                    <strong>Asynchronous Programming:</strong> Asynchronous programming paradigms are employed for efficient task handling and scalability.
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'About Stock Data Analysis Project',
            meta: [
                { hid: 'description', name: 'description', content: 'Learn about our stock data analysis project leveraging machine learning techniques.' }
            ]
        };
    }
};
</script>

<style scoped>
.about {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
}

.about-header {
    text-align: center;
    margin-bottom: 40px;
}

.about-title {
    font-size: 32px;
    margin-bottom: 16px;
}

.about-description {
    font-size: 18px;
    color: #666;
}

.about-subtitle {
    font-size: 24px;
    margin-bottom: 16px;
}

.about-feature-list {
    list-style-type: disc;
    margin-left: 24px;
}

.about-feature-item {
    margin-bottom: 8px;
}

.about-tech-list {
    list-style-type: disc;
    margin-left: 24px;
}

.about-tech-item {
    margin-bottom: 8px;
}
</style>
