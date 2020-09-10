import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name='cs-mon',
    version='1.0.0',
    packages=setuptools.find_packages(),
    include_package_data=True,
    description='The Capstone Monitor.',
    long_description=long_description,
    long_description_content_type="text/markdown",
    author='Jeff Leary',
    author_email='jeffleary00@gmail.com',
    install_requires=[
        'flask',
        'flask-sqlalchemy',
        'flask-script',
        'flask-migrate',
        'flask-cors',
        'python-jose',
        'psycopg2-binary',
    ],
)
