pipeline {
  agent any

  stages {
    stage('Cloner le dépôt') {
      steps {
        git branch: 'main', url: 'https://github.com/mickael2109/motosecure_back.git'
      }
    }

    stage('Tests (optionnel)') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Déclencher déploiement Render') {
      steps {
        sh 'curl -X POST https://api.render.com/deploy/srv-d1v85oripnbc73as0ke0?key=FyOOifAwm4k'
      }
    }
  }
}
