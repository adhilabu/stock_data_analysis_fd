<template>
    <div class="about">
        <div class="about-header">
            <h1 class="about-title">About Stock Data Analysis Project</h1>
            <p class="about-description">
                The Stock Data Analysis project is designed to evaluate and forecast stock prices by determining whether they are at support or resistance levels. This tool leverages advanced machine learning techniques to provide both optimistic and pessimistic forecasts based on historical data, helping investors make informed decisions.
            </p>
        </div>

        <div class="about-features">
            <h2 class="about-subtitle">Features</h2>
            <ul class="about-feature-list">
                <li class="about-feature-item">
                    <strong>Support and Resistance Analysis:</strong> Identifies key support and resistance levels for stocks to help determine potential entry and exit points.
                </li>
                <li class="about-feature-item">
                    <strong>Optimistic and Pessimistic Forecasts:</strong> Provides both optimistic and pessimistic forecasts for stock movements, allowing users to evaluate potential future scenarios.
                </li>
                <li class="about-feature-item">
                    <strong>Predictive Modeling:</strong> Utilizes machine learning models, specifically the Random Forest Classifier, to predict stock movements based on historical data.
                </li>
                <li class="about-feature-item">
                    <strong>Backtesting:</strong> Includes backtesting capabilities to assess the effectiveness of predictive models against historical stock data.
                </li>
                <li class="about-feature-item">
                    <strong>Asynchronous Processing:</strong> Employs asynchronous processing to enhance performance and scalability, ensuring efficient handling of large datasets.
                </li>
            </ul>
        </div>

        <div class="about-tech-stack">
            <h2 class="about-subtitle">Technology Stack</h2>
            <ul class="about-tech-list">
                <li class="about-tech-item">
                    <strong>Python:</strong> Developed using Python, utilizing libraries such as scikit-learn for machine learning and Pandas for data manipulation.
                </li>
                <li class="about-tech-item">
                    <strong>Machine Learning:</strong> Applies machine learning techniques, particularly the Random Forest algorithm, for predicting stock movements.
                </li>
                <li class="about-tech-item">
                    <strong>Asynchronous Programming:</strong> Incorporates asynchronous programming to handle tasks efficiently and scale with large volumes of data.
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
                { hid: 'description', name: 'description', content: 'Learn about our stock data analysis project which evaluates stocks at support or resistance levels and provides forecasts.' }
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
