pipeline {
    agent any

    stages {
        stage('Cloner le repo') {
            steps {
                git branch: 'main', url: 'https://github.com/mickael2109/motosecure_back.git'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Restart Container') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }
}
