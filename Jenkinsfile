pipeline {
  agent any

  stages {
    stage('Cloner le dépôt') {
      steps {
        git branch: 'main', url: 'https://github.com/mickael2109/motosecure_back.git'
      }
    }

    stage('Reconstruire les images Docker') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up --build -d'
      }
    }

    stage('Redémarrer les containers') {
      steps {
        sh 'docker-compose down && docker-compose up -d'
      }
    }
  }
}
