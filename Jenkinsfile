pipeline {
    agent { label 'docker' }  // ou juste 'any' si ton agent peut lancer docker

    stages {
        stage('Cloner le repo') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/mickael2109/motosecure_back.git']]
                ])
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
