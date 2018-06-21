pipeline {
    agent {
        docker {
            image 'node'
        }
    }
    stages {
        stage('Install') {
            steps {
                echo 'Install Deps'
                sh 'npm i -g flow-typed cross-env --verbose'
            }
        }
        stage('Build') {
            steps {
                echo 'CI Build'
                sh 'flow-typed install --verbose'
                sh 'npm ci --verbose'
            }
        }
        stage('Test') {
            steps {
                echo 'CI Test'
                sh 'npm test'
            }
        }
    }
}
