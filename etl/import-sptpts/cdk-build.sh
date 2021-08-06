
set -eux

cp -r import_sptpts/* /asset-output
pip install -r requirements.txt --target /asset-output
